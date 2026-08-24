from __future__ import annotations

from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional
import re
import sys


# ============================================================
# CONFIGURACIÓN
# ============================================================

# Carpeta donde está tu backend
PROJECT_ROOT = Path("Prueba/GeneradorApi")

# Carpetas
CONTROLLERS_DIR = PROJECT_ROOT / "controllers"
ROUTES_DIR = PROJECT_ROOT / "routes"

# Busca schema.prisma automáticamente en todo el proyecto
SEARCH_PRISMA_SCHEMA = True

# Carpeta donde se generan los services
OUTPUT_DIR = Path("Prueba/service_front")

# Si querés sobrescribir archivos existentes
OVERWRITE = True

# Mostrar información detallada
VERBOSE = True


# ============================================================
# DATOS
# ============================================================

@dataclass
class RouteInfo:
    method: str
    path: str
    handlers: list[str] = field(default_factory=list)
    controller: Optional[str] = None
    controller_file: Optional[Path] = None
    operation: str = "custom"
    params: list[str] = field(default_factory=list)


@dataclass
class ControllerFunction:
    name: str
    parameters: str
    body: str


@dataclass
class PrismaField:
    name: str
    prisma_type: str
    optional: bool = False
    list_type: bool = False
    default: Optional[str] = None


@dataclass
class PrismaModel:
    name: str
    fields: list[PrismaField] = field(default_factory=list)


# ============================================================
# UTILIDADES GENERALES
# ============================================================

def read_file(path: Path) -> str:
    """
    Lee archivos intentando UTF-8 y luego algunos encodings comunes.
    """
    encodings = [
        "utf-8",
        "utf-8-sig",
        "latin-1",
        "cp1252",
    ]

    for encoding in encodings:
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError:
            continue
        except OSError:
            return ""

    return ""


def normalize_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def lower_first(text: str) -> str:
    if not text:
        return text

    return text[0].lower() + text[1:]


def upper_first(text: str) -> str:
    if not text:
        return text

    return text[0].upper() + text[1:]


def remove_extension(name: str) -> str:
    return re.sub(
        r"\.(controller|routes?|service)\.ts$",
        "",
        name,
        flags=re.IGNORECASE,
    )


# ============================================================
# NOMBRES
# ============================================================

SPECIAL_SINGULAR = {
    "instituciones": "institucion",
    "usuarios": "usuario",
    "proveedores": "proveedor",
    "equipamientos": "equipamiento",
    "equipamientos": "equipamiento",
    "equipos": "equipo",
    "solicitudes": "solicitud",
    "cotizaciones": "cotizacion",
    "notificaciones": "notificacion",
    "prestaciones": "prestacion",
    "documentos": "documento",
    "roles": "rol",
    "permisos": "permiso",
    "productos": "producto",
    "categorias": "categoria",
    "categorías": "categoria",
    "items": "item",
    "item": "item",
    "usuarios": "usuario",
    "pacientes": "paciente",
    "profesionales": "profesional",
    "institucion": "institucion",
    "proveedor": "proveedor",
    "equipamiento": "equipamiento",
    "solicitud": "solicitud",
    "cotizacion": "cotizacion",
}


def singularize(name: str) -> str:
    """
    Singularización razonable para nombres de endpoints.
    """

    if not name:
        return name

    clean = name.strip().strip("/")

    if clean in SPECIAL_SINGULAR:
        return SPECIAL_SINGULAR[clean]

    lower = clean.lower()

    if lower in SPECIAL_SINGULAR:
        return SPECIAL_SINGULAR[lower]

    # palabras terminadas en -ciones
    if lower.endswith("ciones"):
        return clean[:-6] + "cion"

    # -ses
    if lower.endswith("ses"):
        return clean[:-2]

    # -es
    if lower.endswith("es") and len(clean) > 4:
        return clean[:-2]

    # plural simple
    if lower.endswith("s") and len(clean) > 3:
        return clean[:-1]

    return clean


def pascal_case(name: str) -> str:
    """
    Convierte:
        instituciones -> Instituciones
        instituciones_admin -> InstitucionesAdmin
        item-solicitud -> ItemSolicitud
    """

    if not name:
        return ""

    parts = re.split(r"[_\-\s]+", name)

    return "".join(
        upper_first(part)
        for part in parts
        if part
    )


def model_name_from_resource(resource: str) -> str:
    singular = singularize(resource)

    return pascal_case(singular)


def resource_from_path(path: str) -> str:
    """
    /instituciones/:id/solicitudes
    ->
    instituciones
    """

    parts = [
        p
        for p in path.strip("/").split("/")
        if p
    ]

    for part in parts:
        if not part.startswith(":"):
            return part

    return ""


# ============================================================
# ARCHIVOS
# ============================================================

def find_controller_files() -> list[Path]:
    if not CONTROLLERS_DIR.exists():
        return []

    return sorted(
        CONTROLLERS_DIR.rglob("*.controller.ts")
    )


def find_route_files() -> list[Path]:
    if not ROUTES_DIR.exists():
        return []

    return sorted(
        ROUTES_DIR.rglob("*.routes.ts")
    )


def find_prisma_schema() -> Optional[Path]:
    if not SEARCH_PRISMA_SCHEMA:
        return None

    candidates = []

    # Proyecto
    candidates.extend(
        PROJECT_ROOT.rglob("schema.prisma")
    )

    # Por si está en otro lugar cercano
    if PROJECT_ROOT.parent.exists():
        candidates.extend(
            PROJECT_ROOT.parent.rglob("schema.prisma")
        )

    # Eliminar duplicados
    unique = []

    for path in candidates:
        if path not in unique:
            unique.append(path)

    if unique:
        return unique[0]

    return None


# ============================================================
# PRISMA
# ============================================================

PRISMA_TO_TS = {
    "String": "string",
    "Int": "number",
    "BigInt": "number",
    "Float": "number",
    "Decimal": "number",
    "Boolean": "boolean",
    "DateTime": "string",
    "Json": "unknown",
    "Bytes": "string",
}


def parse_prisma_schema(path: Optional[Path]) -> dict[str, PrismaModel]:
    """
    Analiza modelos básicos de Prisma.

    No pretende ser un parser completo de Prisma.
    Para los tipos normales de models es suficiente.
    """

    if not path:
        return {}

    content = read_file(path)

    if not content:
        return {}

    models: dict[str, PrismaModel] = {}

    pattern = re.compile(
        r"\bmodel\s+(\w+)\s*\{([\s\S]*?)\}",
        re.MULTILINE,
    )

    for match in pattern.finditer(content):
        model_name = match.group(1)
        body = match.group(2)

        model = PrismaModel(
            name=model_name
        )

        for line in body.splitlines():

            line = line.strip()

            if not line:
                continue

            if line.startswith("//"):
                continue

            if line.startswith("@@"):
                continue

            # Quitar comentario
            line = line.split("//", 1)[0].strip()

            field_match = re.match(
                r"^(\w+)\s+([A-Za-z_]\w*)(\[\])?(\?)?",
                line,
            )

            if not field_match:
                continue

            name = field_match.group(1)
            prisma_type = field_match.group(2)
            list_type = bool(field_match.group(3))
            optional = bool(field_match.group(4))

            default_match = re.search(
                r"@default\(([^)]+)\)",
                line,
            )

            default = (
                default_match.group(1)
                if default_match
                else None
            )

            # Ignorar relaciones para la interface plana
            if prisma_type in models:
                continue

            model.fields.append(
                PrismaField(
                    name=name,
                    prisma_type=prisma_type,
                    optional=optional,
                    list_type=list_type,
                    default=default,
                )
            )

        models[model_name] = model

    return models


def find_prisma_model(
    resource: str,
    model_name: str,
    prisma_models: dict[str, PrismaModel],
) -> Optional[PrismaModel]:

    if model_name in prisma_models:
        return prisma_models[model_name]

    normalized = resource.lower()

    singular = singularize(normalized)

    candidates = [
        model_name,
        pascal_case(singular),
        pascal_case(normalized),
    ]

    for candidate in candidates:
        for model in prisma_models.values():
            if model.name.lower() == candidate.lower():
                return model

    return None


def prisma_type_to_ts(
    field: PrismaField,
) -> str:

    ts_type = PRISMA_TO_TS.get(
        field.prisma_type,
        "unknown",
    )

    if field.list_type:
        return f"{ts_type}[]"

    if field.optional:
        return f"{ts_type} | null"

    return ts_type


# ============================================================
# IMPORTS
# ============================================================

def extract_imports(content: str) -> list[dict]:
    """
    Detecta imports del tipo:

    import {
        listarInstituciones,
        crearInstitucion
    } from "../controllers/instituciones.controller";

    También:

    import * as institucionController from "...";

    import institucionController from "...";
    """

    imports = []

    # --------------------------------------------------------
    # import { ... } from "..."
    # --------------------------------------------------------

    named_pattern = re.compile(
        r'import\s*\{([\s\S]*?)\}\s*from\s*[\'"]([^\'"]+)[\'"]',
        re.MULTILINE,
    )

    for match in named_pattern.finditer(content):
        names = match.group(1)
        source = match.group(2)

        for item in names.split(","):
            item = item.strip()

            if not item:
                continue

            parts = re.split(
                r"\s+as\s+",
                item,
                flags=re.IGNORECASE,
            )

            imported = parts[0].strip()
            local = (
                parts[1].strip()
                if len(parts) > 1
                else imported
            )

            imports.append({
                "imported": imported,
                "local": local,
                "source": source,
                "type": "named",
            })

    # --------------------------------------------------------
    # import * as controller from "..."
    # --------------------------------------------------------

    namespace_pattern = re.compile(
        r'import\s+\*\s+as\s+(\w+)\s+from\s*[\'"]([^\'"]+)[\'"]',
        re.MULTILINE,
    )

    for match in namespace_pattern.finditer(content):
        imports.append({
            "imported": "*",
            "local": match.group(1),
            "source": match.group(2),
            "type": "namespace",
        })

    # --------------------------------------------------------
    # import controller from "..."
    # --------------------------------------------------------

    default_pattern = re.compile(
        r'import\s+(\w+)\s+from\s*[\'"]([^\'"]+)[\'"]',
        re.MULTILINE,
    )

    for match in default_pattern.finditer(content):
        imports.append({
            "imported": "default",
            "local": match.group(1),
            "source": match.group(2),
            "type": "default",
        })

    return imports


def resolve_import_path(
    route_file: Path,
    source: str,
    controller_files: list[Path],
) -> Optional[Path]:

    if not source.startswith("."):
        return None

    base = (
        route_file.parent / source
    ).resolve()

    possible = [
        base,
        Path(str(base) + ".ts"),
        Path(str(base) + ".js"),
        base / "index.ts",
    ]

    for candidate in possible:
        if candidate.exists():
            return candidate

    # Comparación por nombre
    source_name = Path(source).name

    for controller in controller_files:
        if controller.stem == source_name:
            return controller

    return None


# ============================================================
# PARSER DE PARENTESIS
# ============================================================

def find_matching_delimiter(
    text: str,
    start: int,
    opening: str = "(",
    closing: str = ")",
) -> int:

    if start >= len(text):
        return -1

    if text[start] != opening:
        return -1

    depth = 0

    in_string: Optional[str] = None
    escaped = False

    i = start

    while i < len(text):

        char = text[i]

        if in_string:

            if escaped:
                escaped = False

            elif char == "\\":
                escaped = True

            elif char == in_string:
                in_string = None

            i += 1
            continue

        # strings
        if char in ('"', "'", "`"):
            in_string = char
            i += 1
            continue

        # comentarios
        if char == "/" and i + 1 < len(text):

            if text[i + 1] == "/":
                newline = text.find("\n", i + 2)

                if newline == -1:
                    return -1

                i = newline + 1
                continue

            if text[i + 1] == "*":
                end_comment = text.find(
                    "*/",
                    i + 2,
                )

                if end_comment == -1:
                    return -1

                i = end_comment + 2
                continue

        if char == opening:
            depth += 1

        elif char == closing:
            depth -= 1

            if depth == 0:
                return i

        i += 1

    return -1


def split_top_level_arguments(
    text: str,
) -> list[str]:
    """
    Divide:

    auth,
    validate,
    controller.crear

    sin romper cosas como:

    foo({ a: 1, b: 2 })
    """

    result = []

    current = []

    paren = 0
    bracket = 0
    brace = 0

    in_string: Optional[str] = None
    escaped = False

    for char in text:

        if in_string:

            current.append(char)

            if escaped:
                escaped = False

            elif char == "\\":
                escaped = True

            elif char == in_string:
                in_string = None

            continue

        if char in ('"', "'", "`"):
            in_string = char
            current.append(char)
            continue

        if char == "(":
            paren += 1

        elif char == ")":
            paren -= 1

        elif char == "[":
            bracket += 1

        elif char == "]":
            bracket -= 1

        elif char == "{":
            brace += 1

        elif char == "}":
            brace -= 1

        if (
            char == ","
            and paren == 0
            and bracket == 0
            and brace == 0
        ):
            value = "".join(current).strip()

            if value:
                result.append(value)

            current = []

        else:
            current.append(char)

    value = "".join(current).strip()

    if value:
        result.append(value)

    return result


# ============================================================
# ROUTES
# ============================================================

def extract_routes(
    content: str,
) -> list[RouteInfo]:

    routes = []

    # router.get(
    # app.get(
    # Router.get(
    pattern = re.compile(
        r"\b(?:router|Router|app)\s*\.\s*"
        r"(get|post|put|patch|delete)\s*\(",
        re.IGNORECASE,
    )

    for match in pattern.finditer(content):

        method = match.group(1).upper()

        opening = content.find(
            "(",
            match.start(),
        )

        if opening == -1:
            continue

        closing = find_matching_delimiter(
            content,
            opening,
        )

        if closing == -1:
            continue

        arguments_text = content[
            opening + 1:closing
        ]

        arguments = split_top_level_arguments(
            arguments_text
        )

        if not arguments:
            continue

        path = arguments[0].strip()

        # Debe ser string
        if len(path) < 2:
            continue

        if path[0] not in ('"', "'", "`"):
            continue

        if path[-1] not in ('"', "'", "`"):
            continue

        path = path[1:-1]

        handlers = []

        for argument in arguments[1:]:

            argument = argument.strip()

            if not argument:
                continue

            # eliminar comentarios
            argument = re.sub(
                r"//.*",
                "",
                argument,
            ).strip()

            # Si es función anónima, ignorar.
            if (
                "=>" in argument
                or argument.startswith("async ")
                or argument.startswith("function")
            ):
                continue

            # Puede ser:
            # controller.crear
            #
            # o:
            # crearInstitucion
            #
            # o:
            # auth, crearInstitucion
            names = re.findall(
                r"\b[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)?",
                argument,
            )

            for name in names:

                if name in {
                    "req",
                    "res",
                    "next",
                    "async",
                    "await",
                    "true",
                    "false",
                    "null",
                    "undefined",
                }:
                    continue

                handlers.append(name)

        routes.append(
            RouteInfo(
                method=method,
                path=path,
                handlers=handlers,
            )
        )

    return routes


# ============================================================
# PARAMETROS
# ============================================================

def extract_path_params(
    path: str,
) -> list[str]:

    return re.findall(
        r":([A-Za-z_$][\w$]*)",
        path,
    )


def replace_path_params(
    path: str,
    params: list[str],
) -> str:

    result = path

    for param in params:
        result = result.replace(
            ":" + param,
            "${" + param + "}",
        )

    return result


# ============================================================
# CONTROLLER FUNCTIONS
# ============================================================

def extract_controller_functions(
    content: str,
) -> dict[str, ControllerFunction]:

    functions = {}

    # --------------------------------------------------------
    # export const foo = async (...) => {
    # const foo = async (...) => {
    # --------------------------------------------------------

    arrow_pattern = re.compile(
        r"(?:export\s+)?"
        r"(?:const|let|var)\s+"
        r"(\w+)"
        r"\s*=\s*"
        r"(?:async\s*)?"
        r"\(",
        re.MULTILINE,
    )

    for match in arrow_pattern.finditer(content):

        name = match.group(1)

        opening = content.find(
            "(",
            match.start(),
        )

        if opening == -1:
            continue

        closing = find_matching_delimiter(
            content,
            opening,
        )

        if closing == -1:
            continue

        parameters = content[
            opening + 1:closing
        ]

        brace = content.find(
            "{",
            closing,
        )

        if brace == -1:
            continue

        body_end = find_matching_delimiter(
            content,
            brace,
            "{",
            "}",
        )

        if body_end == -1:
            continue

        body = content[
            brace + 1:body_end
        ]

        functions[name] = ControllerFunction(
            name=name,
            parameters=parameters,
            body=body,
        )

    # --------------------------------------------------------
    # export async function foo(...) {
    # async function foo(...) {
    # --------------------------------------------------------

    function_pattern = re.compile(
        r"(?:export\s+)?"
        r"(?:async\s+)?"
        r"function\s+"
        r"(\w+)\s*\(",
        re.MULTILINE,
    )

    for match in function_pattern.finditer(content):

        name = match.group(1)

        opening = content.find(
            "(",
            match.start(),
        )

        if opening == -1:
            continue

        closing = find_matching_delimiter(
            content,
            opening,
        )

        if closing == -1:
            continue

        parameters = content[
            opening + 1:closing
        ]

        brace = content.find(
            "{",
            closing,
        )

        if brace == -1:
            continue

        body_end = find_matching_delimiter(
            content,
            brace,
            "{",
            "}",
        )

        if body_end == -1:
            continue

        body = content[
            brace + 1:body_end
        ]

        functions[name] = ControllerFunction(
            name=name,
            parameters=parameters,
            body=body,
        )

    return functions


# ============================================================
# EXTRAER BODY
# ============================================================

def extract_body_fields(
    controller_body: str,
) -> list[str]:

    fields = []

    def add(field: str):
        field = field.strip()

        if re.match(
            r"^[A-Za-z_$][\w$]*$",
            field,
        ):
            if field not in fields:
                fields.append(field)

    # --------------------------------------------------------
    # const { name, email } = req.body
    # --------------------------------------------------------

    destructure_patterns = [
        r"(?:const|let|var)\s*"
        r"\{([^}]+)\}"
        r"\s*=\s*req\s*\.\s*body",

        r"(?:const|let|var)\s*"
        r"\{([^}]+)\}"
        r"\s*=\s*request\s*\.\s*body",
    ]

    for pattern in destructure_patterns:

        for match in re.finditer(
            pattern,
            controller_body,
            re.MULTILINE,
        ):

            content = match.group(1)

            for item in split_top_level_arguments(
                content
            ):
                item = item.strip()

                if not item:
                    continue

                # alias:
                # name: nombreUsuario
                field = item.split(":")[0].strip()

                # default:
                # estado = "activo"
                field = field.split("=")[0].strip()

                add(field)

    # --------------------------------------------------------
    # req.body.name
    # --------------------------------------------------------

    for match in re.finditer(
        r"\b(?:req|request)\s*\.\s*body\s*\.\s*"
        r"([A-Za-z_$][\w$]*)",
        controller_body,
    ):
        add(match.group(1))

    # --------------------------------------------------------
    # req.body["name"]
    # --------------------------------------------------------

    for match in re.finditer(
        r"\b(?:req|request)\s*\.\s*body\s*\[\s*"
        r"['\"]([^'\"]+)['\"]\s*\]",
        controller_body,
    ):
        add(match.group(1))

    # --------------------------------------------------------
    # data.name
    # --------------------------------------------------------

    for match in re.finditer(
        r"\bdata\s*\.\s*([A-Za-z_$][\w$]*)",
        controller_body,
    ):
        add(match.group(1))

    return fields


# ============================================================
# PARAMS USADOS POR CONTROLLER
# ============================================================

def extract_req_params(
    controller_body: str,
) -> list[str]:

    params = []

    patterns = [
        r"req\s*\.\s*params\s*\.\s*"
        r"([A-Za-z_$][\w$]*)",

        r"request\s*\.\s*params\s*\.\s*"
        r"([A-Za-z_$][\w$]*)",

        r"req\s*\.\s*params\s*\[\s*"
        r"['\"]([^'\"]+)['\"]\s*\]",
    ]

    for pattern in patterns:

        for match in re.finditer(
            pattern,
            controller_body,
        ):
            name = match.group(1)

            if name not in params:
                params.append(name)

    # destructuring:
    # const { id } = req.params
    for match in re.finditer(
        r"(?:const|let|var)\s*"
        r"\{([^}]+)\}"
        r"\s*=\s*req\s*\.\s*params",
        controller_body,
    ):

        for item in match.group(1).split(","):

            item = item.strip()

            if not item:
                continue

            name = item.split(":")[0].strip()

            if name not in params:
                params.append(name)

    return params


# ============================================================
# RESPUESTAS
# ============================================================

def extract_response_info(
    controller_body: str,
) -> dict:

    info = {
        "wrapper": None,
        "direct": False,
        "array": False,
        "status_code": None,
    }

    # --------------------------------------------------------
    # status
    # --------------------------------------------------------

    status_match = re.search(
        r"res\s*\.\s*status\s*\(\s*(\d+)\s*\)",
        controller_body,
    )

    if status_match:
        info["status_code"] = int(
            status_match.group(1)
        )

    # --------------------------------------------------------
    # res.json(...)
    # --------------------------------------------------------

    json_matches = list(
        re.finditer(
            r"res\s*\.\s*(?:status\s*\([^)]*\)\s*\.\s*)?json\s*\(",
            controller_body,
        )
    )

    if not json_matches:
        return info

    match = json_matches[-1]

    opening = controller_body.find(
        "(",
        match.start(),
    )

    if opening == -1:
        return info

    closing = find_matching_delimiter(
        controller_body,
        opening,
    )

    if closing == -1:
        return info

    argument = controller_body[
        opening + 1:closing
    ].strip()

    # --------------------------------------------------------
    # res.json([ ... ])
    # --------------------------------------------------------

    if argument.startswith("["):
        info["direct"] = True
        info["array"] = True
        return info

    # --------------------------------------------------------
    # res.json(variable)
    # --------------------------------------------------------

    direct_match = re.match(
        r"^([A-Za-z_$][\w$]*)$",
        argument,
    )

    if direct_match:
        info["direct"] = True
        return info

    # --------------------------------------------------------
    # res.json({ institucion })
    # res.json({ instituciones })
    # --------------------------------------------------------

    object_match = re.match(
        r"^\{([\s\S]*)\}$",
        argument,
    )

    if object_match:

        object_content = object_match.group(1)

        # Buscar propiedad shorthand
        for item in split_top_level_arguments(
            object_content
        ):

            item = item.strip()

            if not item:
                continue

            # institucion
            if re.match(
                r"^[A-Za-z_$][\w$]*$",
                item,
            ):
                info["wrapper"] = item
                return info

            # institucion: variable
            pair_match = re.match(
                r"^([A-Za-z_$][\w$]*)\s*:",
                item,
            )

            if pair_match:
                info["wrapper"] = pair_match.group(1)
                return info

    return info


# ============================================================
# DETECCIÓN DE OPERACIÓN
# ============================================================

def detect_operation(
    route: RouteInfo,
    controller_name: str,
) -> str:

    method = route.method.upper()
    path = route.path.lower()
    controller = controller_name.lower()

    params = route.params

    if method == "GET":

        if not params:
            return "get_all"

        # /instituciones/:id/solicitudes
        # /usuarios/:id/equipamientos
        static_parts = [
            part
            for part in route.path.strip("/").split("/")
            if part and not part.startswith(":")
        ]

        if len(static_parts) >= 2:
            return "relation"

        if (
            "solicitud" in path
            or "cotizacion" in path
            or "equipamiento" in path
            or "proveedor" in path
            or "usuario" in path
        ) and len(static_parts) >= 2:
            return "relation"

        return "get_one"

    if method == "POST":
        return "create"

    if method == "PUT":
        return "update"

    if method == "PATCH":

        if (
            "estado" in path
            or "status" in path
            or "estado" in controller
            or "status" in controller
        ):
            return "status"

        return "update"

    if method == "DELETE":
        return "delete"

    return "custom"


# ============================================================
# CAMPOS DE PRISMA
# ============================================================

def get_model_fields(
    model: Optional[PrismaModel],
) -> list[tuple[str, str]]:

    if not model:
        return []

    fields = []

    for field in model.fields:

        # Relaciones no deberían estar acá
        if field.prisma_type in {
            "Usuario",
            "Institucion",
            "Proveedor",
            "Equipamiento",
            "Solicitud",
            "Cotizacion",
            "RolUsuario",
            "EstadoUsuario",
            "TipoDocumento",
        }:
            continue

        fields.append(
            (
                field.name,
                prisma_type_to_ts(field),
            )
        )

    return fields


# ============================================================
# INFERIR TIPOS SIN PRISMA
# ============================================================

def infer_ts_type(
    field: str,
) -> str:

    name = field.lower()

    if (
        name == "id"
        or name.endswith("_id")
        or name.endswith("id")
        or name.endswith("Id")
    ):
        return "number"

    if (
        "precio" in name
        or "importe" in name
        or "monto" in name
        or "cantidad" in name
        or "stock" in name
        or "edad" in name
        or "numero" in name
        or "número" in name
        or "orden" in name
    ):
        return "number"

    if (
        "activo" in name
        or "habilitado" in name
        or name.startswith("is_")
        or name.startswith("is")
        or name.startswith("tiene")
    ):
        return "boolean"

    if (
        "fecha" in name
        or "date" in name
        or "created" in name
        or "updated" in name
        or "deleted" in name
    ):
        return "string"

    return "string"


# ============================================================
# INTERFACES
# ============================================================

def generate_main_interface(
    model_name: str,
    fields: list[tuple[str, str]],
) -> str:

    lines = [
        f"export interface {model_name} {{"
    ]

    for name, ts_type in fields:
        lines.append(
            f"    {name}: {ts_type};"
        )

    lines.append("}")

    return "\n".join(lines)


def generate_create_interface(
    model_name: str,
    fields: list[tuple[str, str]],
) -> str:

    lines = [
        f"export interface Crear{model_name}Data {{"
    ]

    for name, ts_type in fields:

        # ID normalmente no se envía al crear
        if name.lower() == "id":
            continue

        lines.append(
            f"    {name}: {ts_type};"
        )

    lines.append("}")

    return "\n".join(lines)


def generate_update_interface(
    model_name: str,
    fields: list[tuple[str, str]],
) -> str:

    lines = [
        f"export interface Actualizar{model_name}Data {{"
    ]

    ignored = {
        "id",
        "password",
        "password_hash",
        "contrasena",
        "contraseña",
    }

    for name, ts_type in fields:

        if name.lower() in ignored:
            continue

        lines.append(
            f"    {name}?: {ts_type};"
        )

    lines.append("}")

    return "\n".join(lines)


# ============================================================
# NOMBRE DE FUNCIONES
# ============================================================

def relation_name_from_path(
    path: str,
) -> str:

    parts = [
        p
        for p in path.strip("/").split("/")
        if p and not p.startswith(":")
    ]

    if not parts:
        return "Relacion"

    relation = parts[-1]

    return pascal_case(
        singularize(relation)
    )


def generate_function_name(
    model_name: str,
    operation: str,
    route: RouteInfo,
    controller_name: str,
) -> str:

    if operation == "get_all":
        resource = resource_from_path(
            route.path
        )

        return (
            "obtener"
            + pascal_case(resource)
        )

    if operation == "get_one":
        return (
            "obtener"
            + model_name
            + "PorId"
        )

    if operation == "create":
        return (
            "crear"
            + model_name
        )

    if operation == "update":
        return (
            "actualizar"
            + model_name
        )

    if operation == "delete":
        return (
            "eliminar"
            + model_name
        )

    if operation == "status":
        return (
            "cambiarEstado"
            + model_name
        )

    if operation == "relation":
        relation = relation_name_from_path(
            route.path
        )

        return (
            "obtener"
            + model_name
            + "Con"
            + relation
        )

    # Endpoint personalizado
    if controller_name:
        return controller_name

    # Fallback
    return (
        route.method.lower()
        + pascal_case(
            resource_from_path(route.path)
        )
    )


# ============================================================
# PARAMETROS TYPESCRIPT
# ============================================================

def generate_param_signature(
    params: list[str],
) -> str:

    if not params:
        return ""

    result = []

    for param in params:
        result.append(
            f"{param}: number"
        )

    return ", ".join(result)


# ============================================================
# RESPONSE
# ============================================================

def response_return_expression(
    response_info: dict,
    model_name: str,
) -> Optional[str]:

    wrapper = response_info.get(
        "wrapper"
    )

    if wrapper:
        return (
            f"response.{wrapper}"
        )

    if response_info.get("direct"):
        return "response"

    return None


# ============================================================
# GENERADORES DE MÉTODOS
# ============================================================

def generate_get_all(
    function_name: str,
    path: str,
    model_name: str,
    response_info: dict,
) -> str:

    if response_info.get("wrapper"):

        wrapper = response_info["wrapper"]

        return f"""// =========================================================
// OBTENER TODAS
// =========================================================

export const {function_name} = async (): Promise<{model_name}[]> => {{

    const response = await api.get(
        "{path}"
    );

    return response.{wrapper};

}};"""

    return f"""// =========================================================
// OBTENER TODAS
// =========================================================

export const {function_name} = async (): Promise<{model_name}[]> => {{

    return await api.get(
        "{path}"
    );

}};"""


def generate_get_one(
    function_name: str,
    path: str,
    model_name: str,
    params: list[str],
    response_info: dict,
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return_expression = response_return_expression(
        response_info,
        model_name,
    )

    if return_expression:
        body = f"""
    const response = await api.get(
        `{front_path}`
    );

    return {return_expression};
"""
    else:
        body = f"""
    return await api.get(
        `{front_path}`
    );
"""

    return f"""// =========================================================
// OBTENER {model_name.upper()} POR ID
// =========================================================

export const {function_name} = async (
    {param_signature}
): Promise<{model_name}> => {{
{body}
}};"""


def generate_create(
    function_name: str,
    path: str,
    model_name: str,
    response_info: dict,
) -> str:

    return_expression = response_return_expression(
        response_info,
        model_name,
    )

    if return_expression:
        body = f"""
    const response = await api.post(
        "{path}",
        data
    );

    return {return_expression};
"""
    else:
        body = f"""
    return await api.post(
        "{path}",
        data
    );
"""

    return f"""// =========================================================
// CREAR {model_name.upper()}
// =========================================================

export const {function_name} = async (
    data: Crear{model_name}Data
): Promise<{model_name}> => {{
{body}
}};"""


def generate_update(
    function_name: str,
    path: str,
    model_name: str,
    params: list[str],
    response_info: dict,
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return_expression = response_return_expression(
        response_info,
        model_name,
    )

    if return_expression:
        body = f"""
    const response = await api.put(
        `{front_path}`,
        data
    );

    return {return_expression};
"""
    else:
        body = f"""
    return await api.put(
        `{front_path}`,
        data
    );
"""

    return f"""// =========================================================
// ACTUALIZAR {model_name.upper()}
// =========================================================

export const {function_name} = async (
    {param_signature},
    data: Actualizar{model_name}Data
): Promise<{model_name}> => {{
{body}
}};"""


def generate_patch_update(
    function_name: str,
    path: str,
    model_name: str,
    params: list[str],
    response_info: dict,
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return_expression = response_return_expression(
        response_info,
        model_name,
    )

    if return_expression:
        body = f"""
    const response = await api.patch(
        `{front_path}`,
        data
    );

    return {return_expression};
"""
    else:
        body = f"""
    return await api.patch(
        `{front_path}`,
        data
    );
"""

    return f"""// =========================================================
// ACTUALIZAR PARCIALMENTE {model_name.upper()}
// =========================================================

export const {function_name} = async (
    {param_signature},
    data: Actualizar{model_name}Data
): Promise<{model_name}> => {{
{body}
}};"""


def generate_status(
    function_name: str,
    path: str,
    model_name: str,
    params: list[str],
    status_field: str,
    response_info: dict,
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return_expression = response_return_expression(
        response_info,
        model_name,
    )

    if return_expression:
        body = f"""
    const response = await api.patch(
        `{front_path}`,
        {{
            {status_field},
        }}
    );

    return {return_expression};
"""
    else:
        body = f"""
    return await api.patch(
        `{front_path}`,
        {{
            {status_field},
        }}
    );
"""

    return f"""// =========================================================
// CAMBIAR ESTADO
// =========================================================

export const {function_name} = async (
    {param_signature},
    {status_field}: string
): Promise<{model_name}> => {{
{body}
}};"""


def generate_delete(
    function_name: str,
    path: str,
    params: list[str],
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return f"""// =========================================================
// ELIMINAR
// =========================================================

export const {function_name} = async (
    {param_signature}
): Promise<void> => {{

    await api.delete(
        `{front_path}`
    );

}};"""


def generate_relation(
    function_name: str,
    path: str,
    params: list[str],
) -> str:

    if not params:
        params = ["id"]

    param_signature = generate_param_signature(
        params
    )

    front_path = replace_path_params(
        path,
        params,
    )

    return f"""// =========================================================
// OBTENER RELACIÓN
// =========================================================

export const {function_name} = async (
    {param_signature}
) => {{

    return await api.get(
        `{front_path}`
    );

}};"""


# ============================================================
# CUSTOM ENDPOINT
# ============================================================

def generate_custom(
    function_name: str,
    route: RouteInfo,
    model_name: str,
    controller_function: Optional[ControllerFunction],
) -> str:

    params = route.params

    param_parts = []

    for param in params:
        param_parts.append(
            f"{param}: number"
        )

    body_fields = []

    if controller_function:
        body_fields = extract_body_fields(
            controller_function.body
        )

    has_body = route.method in {
        "POST",
        "PUT",
        "PATCH",
    } and bool(body_fields)

    if has_body:
        param_parts.append(
            f"data: Record<string, unknown>"
        )

    signature = ",\n    ".join(
        param_parts
    )

    front_path = replace_path_params(
        route.path,
        params,
    )

    if route.method == "GET":
        return f"""// =========================================================
// ENDPOINT PERSONALIZADO
// =========================================================
// GET {route.path}

export const {function_name} = async (
    {signature}
) => {{

    return await api.get(
        `{front_path}`
    );

}};"""

    if route.method == "DELETE":
        return f"""// =========================================================
// ENDPOINT PERSONALIZADO
// =========================================================
// DELETE {route.path}

export const {function_name} = async (
    {signature}
) => {{

    return await api.delete(
        `{front_path}`
    );

}};"""

    return f"""// =========================================================
// ENDPOINT PERSONALIZADO
// =========================================================
// {route.method} {route.path}

export const {function_name} = async (
    {signature}
) => {{

    return await api.{route.method.lower()}(
        `{front_path}`,
        data
    );

}};"""


# ============================================================
# DETECTAR CAMPO ESTADO
# ============================================================

def detect_status_field(
    body: str,
) -> str:

    preferred = [
        "estado",
        "estado_user",
        "estado_usuario",
        "status",
        "activo",
        "active",
    ]

    fields = extract_body_fields(
        body
    )

    for field in preferred:
        if field in fields:
            return field

    # Buscar req.body.estado
    for field in preferred:

        if re.search(
            rf"\b{re.escape(field)}\b",
            body,
            re.IGNORECASE,
        ):
            return field

    return "estado"


# ============================================================
# ENCONTRAR CONTROLLER PARA UNA ROUTE
# ============================================================

def find_controller_for_route(
    route_file: Path,
    route_content: str,
    controller_files: list[Path],
) -> Optional[Path]:

    imports = extract_imports(
        route_content
    )

    # Primero usamos imports reales
    for item in imports:

        source = item["source"]

        candidate = resolve_import_path(
            route_file,
            source,
            controller_files,
        )

        if candidate and candidate.exists():
            return candidate

    # Fallback por nombre
    route_base = remove_extension(
        route_file.name
    ).lower()

    for controller in controller_files:

        controller_base = remove_extension(
            controller.name
        ).lower()

        if route_base == controller_base:
            return controller

    return None


# ============================================================
# ENCONTRAR CONTROLLER USADO EN ROUTE
# ============================================================

def resolve_controller_handler(
    route: RouteInfo,
    route_content: str,
    controller_functions: dict[str, ControllerFunction],
) -> Optional[str]:

    if not route.handlers:
        return None

    imports = extract_imports(
        route_content
    )

    local_to_imported = {}

    for item in imports:
        local_to_imported[
            item["local"]
        ] = item["imported"]

    # Buscar desde atrás porque normalmente:
    #
    # router.post("/", auth, crearInstitucion)
    #
    # el controller está último.
    for handler in reversed(
        route.handlers
    ):

        # controller.crearInstitucion
        if "." in handler:

            parts = handler.split(".")

            method = parts[-1]

            if method in controller_functions:
                return method

        # crearInstitucion
        imported = local_to_imported.get(
            handler,
            handler,
        )

        if imported in controller_functions:
            return imported

        if handler in controller_functions:
            return handler

    # Último intento por coincidencia
    for handler in reversed(
        route.handlers
    ):

        handler_clean = (
            handler.split(".")[-1]
        )

        for function_name in controller_functions:

            if (
                function_name.lower()
                == handler_clean.lower()
            ):
                return function_name

    return None


# ============================================================
# PREFIJO DE ROUTES
# ============================================================

def find_app_files() -> list[Path]:

    files = []

    for pattern in [
        "app.ts",
        "server.ts",
        "index.ts",
        "main.ts",
    ]:

        files.extend(
            PROJECT_ROOT.rglob(pattern)
        )

    return files


def detect_route_prefix(
    route_file: Path,
) -> str:

    """
    Intenta detectar:

    app.use("/instituciones", institucionRoutes)

    No es obligatorio.
    """

    route_base = remove_extension(
        route_file.name
    ).lower()

    for app_file in find_app_files():

        content = read_file(
            app_file
        )

        # Buscar app.use("/algo", ...)
        pattern = re.compile(
            r'(?:app|router)\s*\.\s*use\s*'
            r'\(\s*[\'"]([^\'"]+)[\'"]\s*,'
            r'([\s\S]*?)\)',
            re.MULTILINE,
        )

        for match in pattern.finditer(content):

            prefix = match.group(1)
            remainder = match.group(2)

            if route_base in remainder.lower():
                return prefix.rstrip("/")

    return ""


def combine_paths(
    prefix: str,
    path: str,
) -> str:

    if not prefix:
        if not path.startswith("/"):
            return "/" + path

        return path

    if not path:
        return prefix

    if prefix == "/":
        return "/" + path.lstrip("/")

    return (
        prefix.rstrip("/")
        + "/"
        + path.lstrip("/")
    )


# ============================================================
# BODY FIELDS POR OPERACIÓN
# ============================================================

def collect_operation_fields(
    route: RouteInfo,
    controller_function: Optional[ControllerFunction],
) -> list[str]:

    if not controller_function:
        return []

    return extract_body_fields(
        controller_function.body
    )


# ============================================================
# CREAR CAMPOS DE INTERFACE
# ============================================================

def fields_to_types(
    field_names: list[str],
    prisma_model: Optional[PrismaModel],
) -> list[tuple[str, str]]:

    result = []

    prisma_map = {}

    if prisma_model:

        for field in prisma_model.fields:

            prisma_map[
                field.name
            ] = prisma_type_to_ts(field)

    for field_name in field_names:

        ts_type = prisma_map.get(
            field_name,
            infer_ts_type(field_name),
        )

        result.append(
            (
                field_name,
                ts_type,
            )
        )

    return result


# ============================================================
# GENERAR SERVICE COMPLETO
# ============================================================

def generate_service(
    resource: str,
    model_name: str,
    routes: list[RouteInfo],
    controller_content: str,
    controller_functions: dict[str, ControllerFunction],
    prisma_model: Optional[PrismaModel],
) -> tuple[str, list[str]]:

    warnings = []

    # --------------------------------------------------------
    # Campos encontrados
    # --------------------------------------------------------

    all_fields = []

    create_fields = []
    update_fields = []

    for route in routes:

        controller_name = (
            route.controller
        )

        function = (
            controller_functions.get(
                controller_name
            )
            if controller_name
            else None
        )

        fields = collect_operation_fields(
            route,
            function,
        )

        for field in fields:

            if field not in all_fields:
                all_fields.append(field)

        if route.operation == "create":

            for field in fields:

                if field not in create_fields:
                    create_fields.append(field)

        if route.operation == "update":

            for field in fields:

                if field not in update_fields:
                    update_fields.append(field)

    # --------------------------------------------------------
    # Si Prisma existe, usamos sus campos
    # --------------------------------------------------------

    model_fields = get_model_fields(
        prisma_model
    )

    if model_fields:

        main_fields = model_fields

    else:

        main_fields = fields_to_types(
            all_fields,
            prisma_model,
        )

    # Si no encontró campos
    if not main_fields:

        warnings.append(
            "No se pudieron detectar campos del modelo."
        )

    # --------------------------------------------------------
    # CREATE
    # --------------------------------------------------------

    if create_fields:

        create_typed_fields = fields_to_types(
            create_fields,
            prisma_model,
        )

    elif model_fields:

        create_typed_fields = [
            item
            for item in model_fields
            if item[0].lower() not in {
                "id",
                "created_at",
                "createdAt",
                "updated_at",
                "updatedAt",
            }
        ]

    else:

        create_typed_fields = []

    # --------------------------------------------------------
    # UPDATE
    # --------------------------------------------------------

    if update_fields:

        update_typed_fields = fields_to_types(
            update_fields,
            prisma_model,
        )

    elif model_fields:

        update_typed_fields = model_fields

    else:

        update_typed_fields = []

    # --------------------------------------------------------
    # CABECERA
    # --------------------------------------------------------

    filename_model = lower_first(
        model_name
    )

    lines = [
        f"// src/services/{filename_model}.service.ts",
        "//",
        "// GENERADO AUTOMÁTICAMENTE",
        "// Revisar especialmente los endpoints personalizados.",
        "",
        'import api from "../api/api";',
        "",
        "",
        "// =========================================================",
        "// TIPOS",
        "// =========================================================",
        "",
    ]

    # --------------------------------------------------------
    # Interface principal
    # --------------------------------------------------------

    if main_fields:

        lines.append(
            generate_main_interface(
                model_name,
                main_fields,
            )
        )

        lines.append("")

    # --------------------------------------------------------
    # Interface Create
    # --------------------------------------------------------

    if create_typed_fields:

        lines.append(
            generate_create_interface(
                model_name,
                create_typed_fields,
            )
        )

        lines.append("")

    # --------------------------------------------------------
    # Interface Update
    # --------------------------------------------------------

    if update_typed_fields:

        lines.append(
            generate_update_interface(
                model_name,
                update_typed_fields,
            )
        )

        lines.append("")

    # --------------------------------------------------------
    # Métodos
    # --------------------------------------------------------

    generated_names = set()

    for route in routes:

        function_name = generate_function_name(
            model_name,
            route.operation,
            route,
            route.controller or "",
        )

        # Evitar duplicados
        original_function_name = function_name

        counter = 2

        while function_name in generated_names:

            function_name = (
                f"{original_function_name}{counter}"
            )

            counter += 1

        generated_names.add(
            function_name
        )

        controller_function = None

        if route.controller:
            controller_function = (
                controller_functions.get(
                    route.controller
                )
            )

        response_info = {
            "wrapper": None,
            "direct": False,
            "array": False,
        }

        if controller_function:

            response_info = extract_response_info(
                controller_function.body
            )

        else:

            warnings.append(
                f"No se encontró función controller para "
                f"{route.method} {route.path}"
            )

        # ----------------------------------------------------
        # GENERAR
        # ----------------------------------------------------

        if route.operation == "get_all":

            code = generate_get_all(
                function_name,
                route.path,
                model_name,
                response_info,
            )

        elif route.operation == "get_one":

            code = generate_get_one(
                function_name,
                route.path,
                model_name,
                route.params,
                response_info,
            )

        elif route.operation == "create":

            code = generate_create(
                function_name,
                route.path,
                model_name,
                response_info,
            )

        elif route.operation == "update":

            if route.method == "PATCH":

                code = generate_patch_update(
                    function_name,
                    route.path,
                    model_name,
                    route.params,
                    response_info,
                )

            else:

                code = generate_update(
                    function_name,
                    route.path,
                    model_name,
                    route.params,
                    response_info,
                )

        elif route.operation == "delete":

            code = generate_delete(
                function_name,
                route.path,
                route.params,
            )

        elif route.operation == "status":

            status_field = "estado"

            if controller_function:

                status_field = detect_status_field(
                    controller_function.body
                )

            code = generate_status(
                function_name,
                route.path,
                model_name,
                route.params,
                status_field,
                response_info,
            )

        elif route.operation == "relation":

            code = generate_relation(
                function_name,
                route.path,
                route.params,
            )

        else:

            code = generate_custom(
                function_name,
                route,
                model_name,
                controller_function,
            )

            warnings.append(
                f"Endpoint personalizado: "
                f"{route.method} {route.path}"
            )

        lines.append(code)
        lines.append("")

    return (
        "\n".join(lines).rstrip() + "\n",
        warnings,
    )


# ============================================================
# PROCESAR ROUTE
# ============================================================

def process_route_file(
    route_file: Path,
    controller_files: list[Path],
    prisma_models: dict[str, PrismaModel],
) -> Optional[tuple[str, str, str, list[str]]]:

    route_content = read_file(
        route_file
    )

    if not route_content:
        return None

    routes = extract_routes(
        route_content
    )

    if not routes:
        return None

    # --------------------------------------------------------
    # Controller
    # --------------------------------------------------------

    controller_file = (
        find_controller_for_route(
            route_file,
            route_content,
            controller_files,
        )
    )

    controller_content = ""

    if controller_file:
        controller_content = read_file(
            controller_file
        )

    controller_functions = (
        extract_controller_functions(
            controller_content
        )
    )

    # --------------------------------------------------------
    # Prefix
    # --------------------------------------------------------

    prefix = detect_route_prefix(
        route_file
    )

    # --------------------------------------------------------
    # Procesar rutas
    # --------------------------------------------------------

    first_resource = resource_from_path(
        routes[0].path
    )

    if not first_resource:
        first_resource = remove_extension(
            route_file.name
        )

    model_name = model_name_from_resource(
        first_resource
    )

    # Prisma
    prisma_model = find_prisma_model(
        first_resource,
        model_name,
        prisma_models,
    )

    # --------------------------------------------------------
    # Ajustar rutas con prefix
    # --------------------------------------------------------

    final_routes = []

    for route in routes:

        route.path = combine_paths(
            prefix,
            route.path,
        )

        route.params = extract_path_params(
            route.path
        )

        controller_name = (
            resolve_controller_handler(
                route,
                route_content,
                controller_functions,
            )
        )

        route.controller = controller_name

        route.controller_file = (
            controller_file
        )

        route.operation = detect_operation(
            route,
            controller_name or "",
        )

        final_routes.append(
            route
        )

    # --------------------------------------------------------
    # Generar
    # --------------------------------------------------------

    service, warnings = generate_service(
        first_resource,
        model_name,
        final_routes,
        controller_content,
        controller_functions,
        prisma_model,
    )

    filename = (
        lower_first(model_name)
        + ".service.ts"
    )

    return (
        filename,
        service,
        model_name,
        warnings,
    )


# ============================================================
# MAIN
# ============================================================

def main():

    print()
    print("=" * 80)
    print(
        "GENERADOR DE SERVICES FRONTEND"
    )
    print(
        "Controllers + Routes + Prisma -> TypeScript Services"
    )
    print("=" * 80)
    print()

    # --------------------------------------------------------
    # Verificaciones
    # --------------------------------------------------------

    if not PROJECT_ROOT.exists():

        print(
            f"❌ No existe el proyecto:"
        )

        print(
            f"   {PROJECT_ROOT.resolve()}"
        )

        print()
        print(
            "Revisá PROJECT_ROOT al principio del script."
        )

        sys.exit(1)

    # --------------------------------------------------------
    # Buscar archivos
    # --------------------------------------------------------

    controller_files = (
        find_controller_files()
    )

    route_files = (
        find_route_files()
    )

    prisma_schema = (
        find_prisma_schema()
    )

    print(
        f"📁 Proyecto:"
    )

    print(
        f"   {PROJECT_ROOT.resolve()}"
    )

    print()

    print(
        f"🎮 Controllers encontrados: "
        f"{len(controller_files)}"
    )

    print(
        f"🛣️  Routes encontradas:      "
        f"{len(route_files)}"
    )

    if prisma_schema:

        print(
            f"🗄️  Prisma encontrado:"
        )

        print(
            f"   {prisma_schema}"
        )

    else:

        print(
            "🗄️  Prisma: no encontrado"
        )

    print()

    if not route_files:

        print(
            "❌ No se encontraron archivos .routes.ts"
        )

        print()

        print(
            "Buscando en:"
        )

        print(
            f"   {ROUTES_DIR.resolve()}"
        )

        sys.exit(1)

    # --------------------------------------------------------
    # Prisma
    # --------------------------------------------------------

    prisma_models = parse_prisma_schema(
        prisma_schema
    )

    if prisma_models:

        print(
            f"📦 Modelos Prisma detectados: "
            f"{len(prisma_models)}"
        )

        if VERBOSE:

            for model_name in prisma_models:

                print(
                    f"   - {model_name}"
                )

        print()

    # --------------------------------------------------------
    # Output
    # --------------------------------------------------------

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    generated = 0
    failed = 0

    all_warnings = []

    # --------------------------------------------------------
    # Procesar routes
    # --------------------------------------------------------

    for route_file in route_files:

        print(
            "─" * 80
        )

        print(
            f"🛣️  {route_file}"
        )

        try:

            result = process_route_file(
                route_file,
                controller_files,
                prisma_models,
            )

            if not result:

                print(
                    "   ⚠️ No se pudieron detectar rutas."
                )

                failed += 1
                continue

            (
                filename,
                service,
                model_name,
                warnings,
            ) = result

            output_file = (
                OUTPUT_DIR / filename
            )

            # ------------------------------------------------
            # Evitar sobrescritura
            # ------------------------------------------------

            if (
                output_file.exists()
                and not OVERWRITE
            ):

                print(
                    f"   ⚠️ Ya existe: "
                    f"{output_file}"
                )

                print(
                    "   ⏭️ Se omite."
                )

                continue

            output_file.write_text(
                service,
                encoding="utf-8",
            )

            generated += 1

            print(
                f"   📦 Modelo: {model_name}"
            )

            # ------------------------------------------------
            # Mostrar rutas
            # ------------------------------------------------

            route_content = read_file(
                route_file
            )

            detected_routes = extract_routes(
                route_content
            )

            print(
                f"   🔎 Endpoints: "
                f"{len(detected_routes)}"
            )

            # ------------------------------------------------
            # Mostrar advertencias
            # ------------------------------------------------

            if warnings:

                print()

                print(
                    "   ⚠️ Advertencias:"
                )

                for warning in warnings:

                    print(
                        f"      - {warning}"
                    )

                    all_warnings.append(
                        f"{route_file.name}: {warning}"
                    )

            print()

            print(
                f"   ✅ Generado:"
            )

            print(
                f"      {output_file}"
            )

        except Exception as error:

            failed += 1

            print()
            print(
                "   ❌ Error procesando archivo:"
            )

            print(
                f"      {type(error).__name__}: "
                f"{error}"
            )

            print()

            all_warnings.append(
                f"{route_file}: "
                f"{type(error).__name__}: {error}"
            )

    # --------------------------------------------------------
    # Reporte
    # --------------------------------------------------------

    print()
    print("=" * 80)

    print(
        f"✅ Services generados: {generated}"
    )

    print(
        f"⚠️  Archivos con problemas: {failed}"
    )

    print(
        f"📁 Output:"
    )

    print(
        f"   {OUTPUT_DIR.resolve()}"
    )

    print("=" * 80)

    if all_warnings:

        print()
        print(
            "⚠️ RESUMEN DE ADVERTENCIAS"
        )

        print(
            "-" * 80
        )

        for warning in all_warnings:

            print(
                f"- {warning}"
            )

    print()


# ============================================================
# EJECUTAR
# ============================================================

if __name__ == "__main__":
    main()