from pathlib import Path
import re


# ============================================================
# CONFIGURACIÓN
# ============================================================

SCHEMA_PATH = Path("Prueba/schema.prisma")
OUTPUT_DIR = Path("Prueba/services")

# ============================================================
# TIPOS PRISMA -> TYPESCRIPT
# ============================================================

PRISMA_TYPES = {
    "String": "string",
    "Int": "number",
    "Float": "number",
    "Decimal": "number",
    "Boolean": "boolean",
    "DateTime": "Date",
    "BigInt": "bigint",
    "Json": "any",
    "Bytes": "Buffer",
}


# ============================================================
# UTILIDADES GENERALES
# ============================================================

def lower_first(text):
    """
    Convierte:

        Usuario -> usuario
        Institucion -> institucion
    """

    if not text:
        return text

    return text[0].lower() + text[1:]


def upper_first(text):
    """
    Convierte:

        usuario -> Usuario
        institucion -> Institucion
    """

    if not text:
        return text

    return text[0].upper() + text[1:]


def snake_to_camel(text):
    """
    Convierte:

        nombre_usuario -> nombreUsuario
    """

    parts = text.split("_")

    if not parts:
        return text

    return parts[0] + "".join(
        part.capitalize()
        for part in parts[1:]
    )


def camel_to_snake(text):
    """
    Convierte:

        nombreUsuario -> nombre_usuario
    """

    return re.sub(
        r"(?<!^)(?=[A-Z])",
        "_",
        text
    ).lower()


def remove_comments(schema):
    """
    Elimina comentarios // del schema.

    No intenta modificar strings.
    """

    lines = []

    for line in schema.splitlines():

        stripped = line.strip()

        if stripped.startswith("//"):
            continue

        if "//" in line:
            line = line.split("//", 1)[0]

        lines.append(line)

    return "\n".join(lines)


# ============================================================
# PLURALIZACIÓN
# ============================================================

def pluralize(name):

    especiales = {

        "Usuario": "usuarios",

        "Institucion": "instituciones",

        "Proveedor": "proveedores",

        "Equipamento": "equipamentos",

        "Equipamiento": "equipamientos",

        "Solicitud": "solicitudes",

        "Cotizacion": "cotizaciones",

        "ItemSolicitud": "itemsSolicitud",

        "Categoria": "categorias",

        "Marca": "marcas",

        "Modelo": "modelos",

    }

    if name in especiales:
        return especiales[name]

    lower = name.lower()

    if lower.endswith("s"):
        return lower

    if lower.endswith("cion"):
        return lower[:-3] + "ciones"

    if lower.endswith("dad"):
        return lower + "es"

    if lower.endswith("tad"):
        return lower + "es"

    if lower.endswith("ez"):
        return lower[:-2] + "eces"

    if lower.endswith("z"):
        return lower[:-1] + "ces"

    if lower.endswith("a"):
        return lower + "s"

    if lower.endswith("e"):
        return lower + "s"

    if lower.endswith("o"):
        return lower + "s"

    return lower + "s"


# ============================================================
# PARSEAR ENUMS
# ============================================================

def parse_enums(schema):

    enums = {}

    pattern = (
        r"enum\s+(\w+)\s*\{([\s\S]*?)\}"
    )

    for match in re.finditer(
        pattern,
        schema
    ):

        enum_name = match.group(1)

        body = match.group(2)

        values = []

        for raw_line in body.splitlines():

            line = raw_line.strip()

            if not line:
                continue

            if line.startswith("//"):
                continue

            if line.startswith("@"):
                continue

            parts = line.split()

            if not parts:
                continue

            value = parts[0]

            if re.match(
                r"^[A-Za-z_][A-Za-z0-9_]*$",
                value
            ):
                values.append(value)

        enums[enum_name] = values

    return enums


# ============================================================
# PARSEAR MODELOS
# ============================================================

def parse_models(schema):

    models = {}

    pattern = (
        r"model\s+(\w+)\s*\{([\s\S]*?)\}"
    )

    for match in re.finditer(
        pattern,
        schema
    ):

        model_name = match.group(1)

        body = match.group(2)

        fields = []

        for raw_line in body.splitlines():

            line = raw_line.strip()

            if not line:
                continue

            if line.startswith("//"):
                continue

            if line.startswith("@"):
                continue

            parts = line.split()

            if len(parts) < 2:
                continue

            field_name = parts[0]

            field_type = parts[1]

            attributes = " ".join(
                parts[2:]
            )

            fields.append({
                "name": field_name,

                "type": field_type,

                "attributes": attributes,

                "is_array": field_type.endswith("[]"),

                "is_optional": field_type.endswith("?"),

                "is_id": "@id" in attributes,

                "is_unique": "@unique" in attributes,

                "has_default": "@default" in attributes,

                "is_updated_at": "@updatedAt" in attributes,

            })

        models[model_name] = fields

    return models


# ============================================================
# NORMALIZAR TIPO
# ============================================================

def clean_type(field_type):

    return (
        field_type
        .replace("?", "")
        .replace("[]", "")
        .strip()
    )


def is_optional_type(field_type):

    return field_type.endswith("?")


def is_array_type(field_type):

    return field_type.endswith("[]")


def prisma_to_ts(field_type):

    optional = is_optional_type(
        field_type
    )

    array = is_array_type(
        field_type
    )

    clean = clean_type(
        field_type
    )

    ts = PRISMA_TYPES.get(
        clean,
        clean
    )

    if array:
        ts = f"{ts}[]"

    if optional:
        ts += " | null"

    return ts


# ============================================================
# DETECTAR ID
# ============================================================

def get_id_field(fields):

    # Primero @id
    for field in fields:

        if field["is_id"]:
            return field

    # Después id convencional
    for field in fields:

        if field["name"].lower() == "id":
            return field

    return None


def get_id_ts_type(fields):

    id_field = get_id_field(fields)

    if not id_field:
        return "number"

    return prisma_to_ts(
        id_field["type"]
    ).replace(
        " | null",
        ""
    )


# ============================================================
# DETECTAR ENUMS UTILIZADOS
# ============================================================

def get_used_enums(
    fields,
    enums
):

    result = []

    for field in fields:

        clean = clean_type(
            field["type"]
        )

        if clean in enums:

            if clean not in result:
                result.append(clean)

    return result


# ============================================================
# DETECTAR RELACIONES
# ============================================================

def get_relations(
    fields,
    models
):

    relations = []

    for field in fields:

        clean = clean_type(
            field["type"]
        )

        if clean not in models:
            continue

        relations.append({

            "field": field["name"],

            "type": clean,

            "is_array": field["is_array"],

            "optional": field["is_optional"],

        })

    return relations


# ============================================================
# DETECTAR FOREIGN KEYS
# ============================================================

def get_foreign_keys(
    fields,
    models=None
):

    result = []

    for field in fields:

        name = field["name"]

        # Convención clásica
        if (
            name.endswith("_id")
            or name.endswith("_Id")
        ):
            result.append(field)
            continue

        # Convenciones alternativas
        if name.lower().endswith("id"):

            if name.lower() != "id":

                result.append(field)

    return result


# ============================================================
# DETECTAR RELACIÓN DE UNA FOREIGN KEY
# ============================================================

def get_relation_for_fk(
    fk,
    fields,
    models
):

    fk_name = fk["name"]

    possible_names = []

    if fk_name.endswith("_id"):
        base = fk_name[:-3]
        possible_names.extend([
            base,
            snake_to_camel(base),
            upper_first(
                snake_to_camel(base)
            ),
        ])

    elif fk_name.lower().endswith("id"):
        base = fk_name[:-2]
        possible_names.extend([
            base,
            lower_first(base),
        ])

    for field in fields:

        if field["name"] not in possible_names:
            continue

        clean = clean_type(
            field["type"]
        )

        if clean in models:

            return field

    # Buscar por mismo tipo de relación
    for field in fields:

        clean = clean_type(
            field["type"]
        )

        if clean in models:

            relation_id_name = (
                f"{field['name']}_id"
            )

            if fk_name == relation_id_name:
                return field

    return None


# ============================================================
# DETECTAR SOFT DELETE
# ============================================================

def get_soft_delete(fields):

    posibles = [

        "eliminado",

        "eliminada",

        "deleted",

        "isDeleted",

        "activo",

        "active",

        "habilitado",

        "enabled",

    ]

    for field in fields:

        if field["name"] not in posibles:
            continue

        clean = clean_type(
            field["type"]
        )

        if clean == "Boolean":
            return field

    return None


# ============================================================
# DETECTAR CAMPO DE FECHA
# ============================================================

def get_date_field(fields):

    preferidos = [

        "fecha_creacion",

        "fechaCreacion",

        "created_at",

        "createdAt",

        "fecha_creado",

        "fechaCreado",

        "creado_en",

        "creadoEn",

    ]

    for preferred in preferidos:

        for field in fields:

            if field["name"] == preferred:

                if clean_type(
                    field["type"]
                ) == "DateTime":

                    return field

    for field in fields:

        if clean_type(
            field["type"]
        ) == "DateTime":

            return field

    return None


# ============================================================
# DETECTAR CAMPOS AUTOGENERADOS
# ============================================================

def is_auto_generated(field):

    attributes = field["attributes"]

    if field["is_id"] and "@default" in attributes:
        return True

    if "@default" in attributes:

        generators = [

            "autoincrement()",

            "now()",

            "uuid()",

            "cuid()",

            "dbgenerated(",

            "ulid()",

        ]

        for generator in generators:

            if generator in attributes:
                return True

    if field["is_updated_at"]:
        return True

    return False


# ============================================================
# DETECTAR CAMPOS CON DEFAULT
# ============================================================

def has_default(field):

    return (
        "@default" in field["attributes"]
        or field["is_updated_at"]
    )


# ============================================================
# CAMPOS PARA CREATE
# ============================================================

def get_create_fields(
    fields,
    models
):

    result = []

    for field in fields:

        clean = clean_type(
            field["type"]
        )

        # ID
        if field["is_id"]:
            continue

        # Autogenerados
        if is_auto_generated(field):
            continue

        # Relaciones
        if clean in models:
            continue

        # Arrays
        if field["is_array"]:
            continue

        # @updatedAt
        if field["is_updated_at"]:
            continue

        result.append(field)

    return result


# ============================================================
# CAMPOS PARA UPDATE
# ============================================================

def get_update_fields(
    fields,
    models
):

    result = []

    for field in fields:

        clean = clean_type(
            field["type"]
        )

        if field["is_id"]:
            continue

        if clean in models:
            continue

        if field["is_array"]:
            continue

        if is_auto_generated(field):
            continue

        result.append(field)

    return result


# ============================================================
# GENERAR SELECT
# ============================================================

def generate_select(
    relation_model,
    models
):

    if relation_model not in models:
        return []

    fields = models[
        relation_model
    ]

    selected = []

    for field in fields:

        clean = clean_type(
            field["type"]
        )

        if clean in models:
            continue

        if field["is_array"]:
            continue

        selected.append(
            field["name"]
        )

    prioritarios = [

        "id",

        "razon_social",

        "razonSocial",

        "nombre_comercial",

        "nombreComercial",

        "nombre",

        "apellido",

        "email",

        "telefono",

        "estado",

        "estado_user",

        "rol",

        "verificado",

        "activo",

    ]

    encontrados = [

        x
        for x in prioritarios
        if x in selected
    ]

    if encontrados:
        return encontrados

    return selected[:10]


# ============================================================
# GENERAR INCLUDE
# ============================================================

def generate_include(
    model_fields,
    models,
    indent=12
):

    relations = get_relations(
        model_fields,
        models
    )

    if not relations:
        return ""

    spaces = " " * indent

    lines = []

    for relation in relations:

        field = relation["field"]

        related_model = relation["type"]

        if relation["is_array"]:

            lines.append(
                f"{spaces}{field}: true,"
            )

            continue

        select_fields = generate_select(
            related_model,
            models
        )

        if select_fields:

            lines.append(
                f"{spaces}{field}: {{"
            )

            lines.append(
                f"{spaces}    select: {{"
            )

            for selected in select_fields:

                lines.append(
                    f"{spaces}        "
                    f"{selected}: true,"
                )

            lines.append(
                f"{spaces}    }},"
            )

            lines.append(
                f"{spaces}}},"
            )

        else:

            lines.append(
                f"{spaces}{field}: true,"
            )

    if not lines:
        return ""

    base_spaces = spaces[:-4]

    return (
        f"{base_spaces}include: {{\n"
        + "\n".join(lines)
        + f"\n{base_spaces}}},"
    )


# ============================================================
# GENERAR INTERFACE CREATE
# ============================================================

def generate_create_interface(
    fields,
    models
):

    create_fields = get_create_fields(
        fields,
        models
    )

    lines = []

    for field in create_fields:

        optional = ""

        if (
            field["is_optional"]
            or has_default(field)
        ):
            optional = "?"

        ts = prisma_to_ts(
            field["type"]
        )

        ts = ts.replace(
            " | null",
            ""
        )

        lines.append(
            f"        "
            f"{field['name']}"
            f"{optional}: {ts};"
        )

    return "\n".join(lines)


# ============================================================
# GENERAR INTERFACE UPDATE
# ============================================================

def generate_update_interface(
    fields,
    models
):

    update_fields = get_update_fields(
        fields,
        models
    )

    lines = []

    for field in update_fields:

        ts = prisma_to_ts(
            field["type"]
        )

        lines.append(
            f"        "
            f"{field['name']}?: {ts};"
        )

    return "\n".join(lines)


# ============================================================
# GENERAR VALIDACIONES FOREIGN KEY
# ============================================================

def generate_fk_validations(
    fields,
    models
):

    foreign_keys = get_foreign_keys(
        fields,
        models
    )

    lines = []

    generated_models = set()

    for fk in foreign_keys:

        relation = get_relation_for_fk(
            fk,
            fields,
            models
        )

        if not relation:
            continue

        model = clean_type(
            relation["type"]
        )

        if model in generated_models:
            continue

        generated_models.add(model)

        prisma_name = lower_first(
            model
        )

        variable = prisma_name

        fk_name = fk["name"]

        id_type = prisma_to_ts(
            fk["type"]
        )

        # Solo validar IDs simples
        if "[]" in fk["type"]:
            continue

        lines.extend([

            "",

            "    // =====================================================",

            f"    // VERIFICAR {model.upper()}",

            "    // =====================================================",

            "",

            f"    const {variable} =",

            f"        await prisma.{prisma_name}.findUnique({{",

            "",

            "            where: {",

            f"                id: data.{fk_name},",

            "            },",

            "        });",

            "",

            f"    if (!{variable}) {{",

            "",

            "        throw new Error(",

            f'            "El {model.lower()} '
            f'no existe"',

            "        );",

            "    }",

        ])

    return "\n".join(lines)


# ============================================================
# GENERAR CREATE ANIDADO 1:N
# ============================================================

def generate_nested_create(
    fields,
    models
):

    relations = get_relations(
        fields,
        models
    )

    lines = []

    for relation in relations:

        if not relation["is_array"]:
            continue

        relation_field = relation[
            "field"
        ]

        related_model = relation[
            "type"
        ]

        related_fields = models[
            related_model
        ]

        create_fields = get_create_fields(
            related_fields,
            models
        )

        if not create_fields:
            continue

        lines.extend([

            f"            {relation_field}: {{",

            "                create:",

            f"                    data."
            f"{relation_field}.map((item) => ({{",

        ])

        for field in create_fields:

            name = field["name"]

            lines.extend([

                f"                        {name}:",

                f"                            item.{name},",

            ])

        lines.extend([

            "                    })),",

            "            },",

        ])

    return lines


# ============================================================
# GENERAR LISTAR
# ============================================================

def generate_list(
    model_name,
    fields,
    models
):

    prisma_name = lower_first(
        model_name
    )

    plural = pluralize(
        model_name
    )

    soft_delete = get_soft_delete(
        fields
    )

    date_field = get_date_field(
        fields
    )

    include = generate_include(
        fields,
        models,
        indent=12
    )

    lines = [

        "",

        "",

        "// =========================================================",

        f"// LISTAR TODAS LAS "
        f"{plural.upper()}",

        "// =========================================================",

        "",

        f"export const listar"
        f"{upper_first(plural)} = async () => {{",

        "",

        f"    return await prisma."
        f"{prisma_name}.findMany({{",

    ]

    if soft_delete:

        lines.extend([

            "",

            "        where: {",

            f"            "
            f"{soft_delete['name']}: false,",

            "        },",

        ])

    if date_field:

        lines.extend([

            "",

            "        orderBy: {",

            f"            "
            f"{date_field['name']}: \"desc\",",

            "        },",

        ])

    if include:

        lines.extend([

            "",

            f"        "
            f"{include.strip()}",

        ])

    lines.extend([

        "    });",

        "};",

    ])

    return "\n".join(lines)


# ============================================================
# GENERAR FIND BY ID
# ============================================================

def generate_find(
    model_name,
    fields,
    models
):

    prisma_name = lower_first(
        model_name
    )

    id_field = get_id_field(
        fields
    )

    if not id_field:
        return ""

    variable = lower_first(
        model_name
    )

    id_ts_type = get_id_ts_type(
        fields
    )

    include = generate_include(
        fields,
        models,
        indent=12
    )

    lines = [

        "",

        "",

        "// =========================================================",

        f"// BUSCAR {model_name.upper()} POR ID",

        "// =========================================================",

        "",

        f"export const buscar"
        f"{model_name} = async (",

        f"    id: {id_ts_type}",

        ") => {",

        "",

        f"    const {variable} =",

        f"        await prisma."
        f"{prisma_name}.findUnique({{",

        "",

        "            where: {",

        f"                "
        f"{id_field['name']}: id,",

        "            },",

    ]

    if include:

        lines.extend([

            "",

            f"            "
            f"{include.strip()}",

        ])

    lines.extend([

        "        });",

        "",

        f"    if (!{variable}) {{",

        "",

        "        throw new Error(",

        f'            "{model_name} '
        f'no encontrado"',

        "        );",

        "    }",

        "",

        "    return ",

        f"        {variable};",

        "};",

    ])

    return "\n".join(lines)


# ============================================================
# GENERAR CREATE
# ============================================================

def generate_create(
    model_name,
    fields,
    models,
    enums
):

    prisma_name = lower_first(
        model_name
    )

    create_fields = get_create_fields(
        fields,
        models
    )

    interface = generate_create_interface(
        fields,
        models
    )

    validations = generate_fk_validations(
        fields,
        models
    )

    nested = generate_nested_create(
        fields,
        models
    )

    include = generate_include(
        fields,
        models,
        indent=12
    )

    lines = [

        "",

        "",

        "// =========================================================",

        f"// CREAR {model_name.upper()}",

        "// =========================================================",

        "",

        f"export const crear"
        f"{model_name} = async (data: {{",

        "",

    ]

    if interface:

        lines.extend(
            interface.splitlines()
        )

    # Relaciones array
    for relation in get_relations(
        fields,
        models
    ):

        if not relation["is_array"]:
            continue

        related_fields = models[
            relation["type"]
        ]

        nested_fields = get_create_fields(
            related_fields,
            models
        )

        if not nested_fields:
            continue

        lines.extend([

            "",

            f"        "
            f"{relation['field']}?: {{",

        ])

        for field in nested_fields:

            optional = ""

            if (
                field["is_optional"]
                or has_default(field)
            ):
                optional = "?"

            ts = prisma_to_ts(
                field["type"]
            )

            ts = ts.replace(
                " | null",
                ""
            )

            lines.append(

                f"            "
                f"{field['name']}"
                f"{optional}: {ts};"

            )

        lines.extend([

            "        }[];",

        ])

    lines.extend([

        "",

        "}) => {",

    ])

    if validations:

        lines.extend(
            validations.splitlines()
        )

    lines.extend([

        "",

        "    return await prisma."

        + prisma_name

        + ".create({",

        "",

        "        data: {",

    ])

    for field in create_fields:

        name = field["name"]

        lines.extend([

            "",

            f"            {name}:",

            f"                data.{name},",

        ])

    if nested:

        lines.extend([

            "",

            *nested,

        ])

    lines.extend([

        "        },",

    ])

    if include:

        lines.extend([

            "",

            f"        "
            f"{include.strip()}",

        ])

    lines.extend([

        "    });",

        "};",

    ])

    return "\n".join(lines)


# ============================================================
# GENERAR UPDATE
# ============================================================

def generate_update(
    model_name,
    fields,
    models
):

    prisma_name = lower_first(
        model_name
    )

    id_field = get_id_field(
        fields
    )

    if not id_field:
        return ""

    variable = lower_first(
        model_name
    )

    interface = generate_update_interface(
        fields,
        models
    )

    include = generate_include(
        fields,
        models,
        indent=12
    )

    id_ts_type = get_id_ts_type(
        fields
    )

    lines = [

        "",

        "",

        "// =========================================================",

        f"// ACTUALIZAR {model_name.upper()}",

        "// =========================================================",

        "",

        f"export const actualizar"
        f"{model_name} = async (",

        "",

        f"    id: {id_ts_type},",

        "",

        "    data: {",

        "",

    ]

    if interface:

        lines.extend(
            interface.splitlines()
        )

    lines.extend([

        "",

        "    },",

        "",

        ") => {",

        "",

        f"    const {variable} =",

        f"        await prisma."
        f"{prisma_name}.findUnique({{",

        "",

        "            where: {",

        f"                "
        f"{id_field['name']}: id,",

        "            },",

        "        });",

        "",

        f"    if (!{variable}) {{",

        "",

        "        throw new Error(",

        f'            "{model_name} '
        f'no encontrado"',

        "        );",

        "    }",

        "",

        f"    return await prisma."
        f"{prisma_name}.update({{",

        "",

        "        where: {",

        f"            "
        f"{id_field['name']}: id,",

        "        },",

        "",

        "        data,",

    ])

    if include:

        lines.extend([

            "",

            f"        "
            f"{include.strip()}",

        ])

    lines.extend([

        "    });",

        "};",

    ])

    return "\n".join(lines)


# ============================================================
# GENERAR DELETE
# ============================================================

def generate_delete(
    model_name,
    fields
):

    prisma_name = lower_first(
        model_name
    )

    id_field = get_id_field(
        fields
    )

    if not id_field:
        return ""

    soft_delete = get_soft_delete(
        fields
    )

    variable = lower_first(
        model_name
    )

    id_ts_type = get_id_ts_type(
        fields
    )

    lines = [

        "",

        "",

        "// =========================================================",

        f"// ELIMINAR {model_name.upper()}",

        "// =========================================================",

        "",

        f"export const eliminar"
        f"{model_name} = async (",

        f"    id: {id_ts_type}",

        ") => {",

        "",

        f"    const {variable} =",

        f"        await prisma."
        f"{prisma_name}.findUnique({{",

        "",

        "            where: {",

        f"                "
        f"{id_field['name']}: id,",

        "            },",

        "        });",

        "",

        f"    if (!{variable}) {{",

        "",

        "        throw new Error(",

        f'            "{model_name} '
        f'no encontrado"',

        "        );",

        "    }",

        "",

    ]

    if soft_delete:

        lines.extend([

            f"    return await prisma."
            f"{prisma_name}.update({{",

            "",

            "        where: {",

            f"            "
            f"{id_field['name']}: id,",

            "        },",

            "",

            "        data: {",

            f"            "
            f"{soft_delete['name']}: true,",

            "        },",

            "    });",

        ])

    else:

        lines.extend([

            f"    return await prisma."
            f"{prisma_name}.delete({{",

            "",

            "        where: {",

            f"            "
            f"{id_field['name']}: id,",

            "        },",

            "    });",

        ])

    lines.append(
        "};"
    )

    return "\n".join(lines)


# ============================================================
# GENERAR SERVICE COMPLETO
# ============================================================

def generate_service(
    model_name,
    fields,
    models,
    enums
):

    enum_imports = get_used_enums(
        fields,
        enums
    )

    lines = [

        f"// cotimed-api/src/services/"
        f"{lower_first(model_name)}.service.ts",

        "",

        "// =========================================================",

        "// IMPORTS",

        "// =========================================================",

        "",

        'import prisma from "../prisma/prisma";',

    ]

    if enum_imports:

        lines.extend([

            "",

            "import {",

        ])

        for enum_name in enum_imports:

            lines.append(
                f"    {enum_name},"
            )

        lines.extend([

            '} from "@prisma/client";',

        ])

    lines.extend([

        "",

        "",

        "// =========================================================",

        f"// SERVICE: {model_name.upper()}",

        "// =========================================================",

    ])

    # LISTAR
    lines.append(
        generate_list(
            model_name,
            fields,
            models
        )
    )

    # BUSCAR
    find_service = generate_find(
        model_name,
        fields,
        models
    )

    if find_service:
        lines.append(
            find_service
        )

    # CREAR
    lines.append(
        generate_create(
            model_name,
            fields,
            models,
            enums
        )
    )

    # ACTUALIZAR
    update_service = generate_update(
        model_name,
        fields,
        models
    )

    if update_service:
        lines.append(
            update_service
        )

    # ELIMINAR
    delete_service = generate_delete(
        model_name,
        fields
    )

    if delete_service:
        lines.append(
            delete_service
        )

    return "\n".join(lines)


# ============================================================
# VALIDAR SCHEMA
# ============================================================

def validate_schema(
    models,
    enums
):

    warnings = []

    if not models:

        warnings.append(
            "No se encontraron modelos Prisma."
        )

    for model_name, fields in models.items():

        if not fields:

            warnings.append(
                f"El modelo {model_name} "
                f"no tiene campos."
            )

        id_field = get_id_field(
            fields
        )

        if not id_field:

            warnings.append(
                f"El modelo {model_name} "
                f"no tiene @id ni campo id."
            )

        for field in fields:

            clean = clean_type(
                field["type"]
            )

            if (
                clean not in PRISMA_TYPES
                and clean not in models
                and clean not in enums
            ):

                warnings.append(

                    f"Tipo desconocido "
                    f"{clean} en "
                    f"{model_name}.{field['name']}."

                )

    return warnings


# ============================================================
# MOSTRAR RESUMEN DEL MODELO
# ============================================================

def print_model_summary(
    model_name,
    fields,
    models,
    enums
):

    id_field = get_id_field(
        fields
    )

    relations = get_relations(
        fields,
        models
    )

    used_enums = get_used_enums(
        fields,
        enums
    )

    print(
        f"   📦 {model_name}"
    )

    if id_field:

        print(
            f"      🔑 ID: "
            f"{id_field['name']} "
            f"({id_field['type']})"
        )

    if relations:

        relation_names = ", ".join(
            relation["field"]
            for relation in relations
        )

        print(
            f"      🔗 Relaciones: "
            f"{relation_names}"
        )

    if used_enums:

        enum_names = ", ".join(
            used_enums
        )

        print(
            f"      🔤 Enums: "
            f"{enum_names}"
        )


# ============================================================
# MAIN
# ============================================================

def main():

    print()

    print("=" * 70)

    print(
        "       GENERADOR AUTOMÁTICO "
        "DE SERVICES PRISMA"
    )

    print("=" * 70)

    print()

    # --------------------------------------------------------
    # VERIFICAR SCHEMA
    # --------------------------------------------------------

    if not SCHEMA_PATH.exists():

        print(
            f"❌ No se encontró: "
            f"{SCHEMA_PATH}"
        )

        print()

        print(
            "Ejecutá este script desde "
            "la raíz del proyecto."
        )

        print()

        return

    # --------------------------------------------------------
    # LEER SCHEMA
    # --------------------------------------------------------

    try:

        schema = SCHEMA_PATH.read_text(
            encoding="utf-8"
        )

    except Exception as error:

        print(
            f"❌ Error leyendo schema: "
            f"{error}"
        )

        return

    # --------------------------------------------------------
    # LIMPIAR COMENTARIOS
    # --------------------------------------------------------

    schema_clean = remove_comments(
        schema
    )

    # --------------------------------------------------------
    # PARSEAR
    # --------------------------------------------------------

    models = parse_models(
        schema_clean
    )

    enums = parse_enums(
        schema_clean
    )

    print(
        f"📦 Modelos encontrados: "
        f"{len(models)}"
    )

    print(
        f"🔤 Enums encontrados: "
        f"{len(enums)}"
    )

    print()

    # --------------------------------------------------------
    # VALIDAR
    # --------------------------------------------------------

    warnings = validate_schema(
        models,
        enums
    )

    if warnings:

        print(
            "⚠️ ADVERTENCIAS DEL SCHEMA:"
        )

        print()

        for warning in warnings:

            print(
                f"   ⚠️ {warning}"
            )

        print()

    # --------------------------------------------------------
    # MOSTRAR MODELOS
    # --------------------------------------------------------

    print(
        "📋 ESTRUCTURA DETECTADA:"
    )

    print()

    for model_name, fields in models.items():

        print_model_summary(
            model_name,
            fields,
            models,
            enums
        )

    print()

    # --------------------------------------------------------
    # CREAR DIRECTORIO
    # --------------------------------------------------------

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # --------------------------------------------------------
    # GENERAR SERVICES
    # --------------------------------------------------------

    generated = 0

    errors = 0

    for model_name, fields in models.items():

        print(
            f"⚙️ Generando "
            f"{model_name}..."
        )

        try:

            service = generate_service(
                model_name,
                fields,
                models,
                enums
            )

            filename = (
                lower_first(model_name)
                + ".service.ts"
            )

            output = (
                OUTPUT_DIR
                / filename
            )

            output.write_text(
                service,
                encoding="utf-8"
            )

            print(
                f"   ✅ {output}"
            )

            generated += 1

        except Exception as error:

            print(
                f"   ❌ Error generando "
                f"{model_name}: "
                f"{error}"
            )

            errors += 1

    # --------------------------------------------------------
    # RESULTADO
    # --------------------------------------------------------

    print()

    print("=" * 70)

    print(
        f"✅ Services generados: "
        f"{generated}"
    )

    if errors:

        print(
            f"❌ Errores: "
            f"{errors}"
        )

    print(
        f"📁 Carpeta: "
        f"{OUTPUT_DIR}"
    )

    print("=" * 70)

    print()

    print(
        "🎉 Proceso terminado."
    )

    print()


# ============================================================
# EJECUTAR
# ============================================================

if __name__ == "__main__":

    main()


