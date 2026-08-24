from pathlib import Path
import re


# ============================================================
# CONFIGURACIÓN
# ============================================================

CONTROLLERS_DIR = Path("Prueba/controllers")
ROUTES_DIR = Path("Prueba/routes")


# ============================================================
# UTILIDADES
# ============================================================

def service_name_from_file(file):

    """
    solicitudes.controller.ts
    ->
    solicitudes
    """

    name = file.stem

    if name.endswith(".controller"):
        name = name[:-11]

    return name


def controller_import_name(function_name):

    return function_name


# ============================================================
# DETECTAR CONTROLLERS
# ============================================================

def parse_controllers(content):

    """
    Detecta:

        export const listarSolicitudesController = async ...
        export const buscarSolicitudController = async ...
        export const crearSolicitudController = async ...
        export const actualizarSolicitudController = async ...
        export const eliminarSolicitudController = async ...
    """

    pattern = (
        r"export\s+const\s+"
        r"(\w+Controller)"
        r"\s*="
    )

    functions = []

    for match in re.finditer(
        pattern,
        content
    ):

        functions.append(
            match.group(1)
        )

    return functions


# ============================================================
# QUITAR CONTROLLER
# ============================================================

def remove_controller_suffix(name):

    if name.endswith("Controller"):

        return name[:-10]

    return name


# ============================================================
# DETECTAR OPERACIÓN
# ============================================================

def detect_operation(function_name):

    name = remove_controller_suffix(
        function_name
    )

    if name.startswith("listar"):
        return "list"

    if name.startswith("buscar"):
        return "find"

    if name.startswith("obtener"):
        return "find"

    if name.startswith("crear"):
        return "create"

    if name.startswith("actualizar"):
        return "update"

    if name.startswith("editar"):
        return "update"

    if name.startswith("eliminar"):
        return "delete"

    return "custom"


# ============================================================
# DETECTAR NOMBRE DE RECURSO
# ============================================================

def resource_from_function(function_name):

    name = remove_controller_suffix(
        function_name
    )

    prefixes = [
        "listar",
        "buscar",
        "obtener",
        "crear",
        "actualizar",
        "editar",
        "eliminar",
    ]

    for prefix in prefixes:

        if name.startswith(prefix):

            resource = name[
                len(prefix):
            ]

            return resource

    return name


# ============================================================
# GENERAR IMPORTS
# ============================================================

def generate_imports(
    service_name,
    controllers
):

    lines = [
        'import { Router } from "express";',
        "",
        f'import {{',
    ]

    for controller in controllers:

        lines.append(
            f"    {controller},"
        )

    lines.extend([
        f'}} from "../controllers/'
        f'{service_name}.controller";',
        "",
    ])

    return "\n".join(lines)


# ============================================================
# GENERAR ROUTER
# ============================================================

def generate_router(
    service_name
):

    variable = (
        service_name
        .replace("-", "_")
        .replace(".", "_")
    )

    return f"""
const router = Router();

"""


# ============================================================
# GENERAR RUTA
# ============================================================

def generate_route(
    controller
):

    operation = detect_operation(
        controller
    )

    if operation == "list":

        return (
            f'router.get("/", {controller});'
        )

    if operation == "find":

        return (
            f'router.get("/:id", {controller});'
        )

    if operation == "create":

        return (
            f'router.post("/", {controller});'
        )

    if operation == "update":

        return (
            f'router.put("/:id", {controller});'
        )

    if operation == "delete":

        return (
            f'router.delete("/:id", {controller});'
        )

    # Operaciones personalizadas
    resource = resource_from_function(
        controller
    )

    resource = resource[:1].lower() + resource[1:]

    return (
        f'router.post("/{resource}", {controller});'
    )


# ============================================================
# GENERAR EXPORT
# ============================================================

def generate_export():

    return """
export default router;
"""


# ============================================================
# GENERAR ROUTE COMPLETA
# ============================================================

def generate_route_file(
    service_name,
    controllers
):

    lines = []

    # Comentario
    lines.append(
        f"// cotimed-api/src/routes/"
        f"{service_name}.routes.ts"
    )

    lines.append("")

    # Imports
    lines.append(
        generate_imports(
            service_name,
            controllers
        )
    )

    # Router
    lines.append(
        generate_router(
            service_name
        )
    )

    # Comentario
    lines.extend([
        "// =========================================================",
        "// RUTAS",
        "// =========================================================",
        "",
    ])

    # Rutas
    for controller in controllers:

        route = generate_route(
            controller
        )

        lines.append(route)
        lines.append("")

    # Export
    lines.append(
        generate_export()
    )

    return "\n".join(lines)


# ============================================================
# PROCESAR CONTROLLERS
# ============================================================

def process_controllers():

    if not CONTROLLERS_DIR.exists():

        print(
            f"❌ No existe: {CONTROLLERS_DIR}"
        )

        print(
            "Primero generá los controllers."
        )

        return

    ROUTES_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    files = list(
        CONTROLLERS_DIR.glob(
            "*.controller.ts"
        )
    )

    if not files:

        print(
            "❌ No se encontraron controllers."
        )

        return

    print()
    print("=" * 70)
    print("          GENERADOR AUTOMÁTICO DE ROUTES")
    print("=" * 70)
    print()

    print(
        f"📦 Controllers encontrados: {len(files)}"
    )

    print()

    generated = 0

    for controller_file in files:

        print(
            f"⚙️ Procesando "
            f"{controller_file.name}..."
        )

        content = controller_file.read_text(
            encoding="utf-8"
        )

        controllers = parse_controllers(
            content
        )

        if not controllers:

            print(
                "   ⚠️ No se encontraron "
                "funciones controller."
            )

            continue

        service_name = (
            service_name_from_file(
                controller_file
            )
        )

        route_file = (
            ROUTES_DIR
            / f"{service_name}.routes.ts"
        )

        route_content = (
            generate_route_file(
                service_name,
                controllers
            )
        )

        route_file.write_text(
            route_content,
            encoding="utf-8"
        )

        print(
            f"   ✅ {route_file}"
        )

        for controller in controllers:

            route = generate_route(
                controller
            )

            print(
                f"      → {route}"
            )

        print()

        generated += 1

    print("=" * 70)

    print(
        f"✅ Routes generadas: {generated}"
    )

    print("=" * 70)

    print()


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    process_controllers()