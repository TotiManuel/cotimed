from pathlib import Path
import re


# ============================================================
# CONFIGURACIÓN
# ============================================================

SERVICES_DIR = Path("Prueba/services")
CONTROLLERS_DIR = Path("Prueba/controllers")


# ============================================================
# UTILIDADES
# ============================================================

def lower_first(text):
    if not text:
        return text

    return text[0].lower() + text[1:]


def capitalize(text):
    if not text:
        return text

    return text[0].upper() + text[1:]


def singular_from_function(function_name):
    """
    Ejemplos:

        listarUsuarios
        buscarUsuario
        crearUsuario

    """

    prefixes = [
        "listar",
        "buscar",
        "crear",
        "actualizar",
        "eliminar",
        "obtener",
        "editar",
    ]

    for prefix in prefixes:

        if function_name.startswith(prefix):

            return function_name[len(prefix):]

    return function_name


def service_name_from_file(file):

    """
    solicitudes.service.ts
    ->
    solicitudes
    """

    name = file.stem

    if name.endswith(".service"):

        name = name[:-8]

    return name


# ============================================================
# DETECTAR FUNCIONES DEL SERVICE
# ============================================================

def parse_functions(content):

    """
    Busca:

        export const listarUsuarios = async (...)
        export const buscarUsuario = async (...)
        export const crearUsuario = async (...)
        export const actualizarUsuario = async (...)
        export const eliminarUsuario = async (...)
    """

    pattern = (
        r"export\s+const\s+"
        r"(\w+)"
        r"\s*=\s*async\s*"
        r"\(([\s\S]*?)\)"
        r"\s*=>"
    )

    functions = []

    for match in re.finditer(
        pattern,
        content
    ):

        function_name = match.group(1)

        arguments = match.group(2)

        functions.append({
            "name": function_name,
            "arguments": arguments.strip(),
        })

    return functions


# ============================================================
# CLASIFICAR FUNCIÓN
# ============================================================

def detect_operation(function_name):

    if function_name.startswith("listar"):
        return "list"

    if function_name.startswith("buscar"):
        return "find"

    if function_name.startswith("obtener"):
        return "find"

    if function_name.startswith("crear"):
        return "create"

    if function_name.startswith("actualizar"):
        return "update"

    if function_name.startswith("editar"):
        return "update"

    if function_name.startswith("eliminar"):
        return "delete"

    return "custom"


# ============================================================
# DETECTAR ARGUMENTOS
# ============================================================

def parse_arguments(arguments):

    """
    Detecta argumentos como:

        id: number

        id: number,
        data: {...}

        id_institucion: number
    """

    result = []

    # Eliminar comentarios
    arguments = re.sub(
        r"//.*",
        "",
        arguments
    )

    # Buscar nombres de argumentos
    pattern = r"(\w+)\s*(?:\?|)\s*:"

    for match in re.finditer(
        pattern,
        arguments
    ):

        result.append(
            match.group(1)
        )

    return result


# ============================================================
# DETECTAR SI RECIBE BODY
# ============================================================

def has_data_argument(arguments):

    args = parse_arguments(
        arguments
    )

    return "data" in args


# ============================================================
# DETECTAR ID
# ============================================================

def has_id_argument(arguments):

    args = parse_arguments(
        arguments
    )

    return "id" in args


# ============================================================
# GENERAR CONTROLLER LIST
# ============================================================

def generate_list_controller(
    function_name
):

    return f"""
// =========================================================
// LISTAR
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const resultado =
            await {function_name}();

        return res.status(200).json(
            resultado
        );

    }} catch (error) {{

        console.error(error);

        return res.status(500).json({{

            message:
                "Error al obtener los registros",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",
        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER FIND
# ============================================================

def generate_find_controller(
    function_name,
    arguments
):

    parsed = parse_arguments(
        arguments
    )

    # Primer argumento normalmente es ID
    argument = (
        parsed[0]
        if parsed
        else "id"
    )

    return f"""
// =========================================================
// BUSCAR
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const {argument} =
            Number(req.params.id);


        const resultado =
            await {function_name}(
                {argument}
            );


        return res.status(200).json(
            resultado
        );

    }} catch (error) {{

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {{

            return res.status(404).json({{

                message:
                    error.message,

            }});
        }}


        return res.status(500).json({{

            message:
                "Error al buscar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER CREATE
# ============================================================

def generate_create_controller(
    function_name
):

    return f"""
// =========================================================
// CREAR
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const resultado =
            await {function_name}(
                req.body
            );


        return res.status(201).json(
            resultado
        );


    }} catch (error) {{

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no existe"
            )
        ) {{

            return res.status(400).json({{

                message:
                    error.message,

            }});
        }}


        return res.status(500).json({{

            message:
                "Error al crear el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER UPDATE
# ============================================================

def generate_update_controller(
    function_name,
    arguments
):

    parsed = parse_arguments(
        arguments
    )

    id_argument = (
        parsed[0]
        if parsed
        else "id"
    )

    return f"""
// =========================================================
// ACTUALIZAR
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const {id_argument} =
            Number(req.params.id);


        const resultado =
            await {function_name}(
                {id_argument},

                req.body
            );


        return res.status(200).json(
            resultado
        );


    }} catch (error) {{

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {{

            return res.status(404).json({{

                message:
                    error.message,

            }});
        }}


        return res.status(500).json({{

            message:
                "Error al actualizar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER DELETE
# ============================================================

def generate_delete_controller(
    function_name,
    arguments
):

    parsed = parse_arguments(
        arguments
    )

    id_argument = (
        parsed[0]
        if parsed
        else "id"
    )

    return f"""
// =========================================================
// ELIMINAR
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const {id_argument} =
            Number(req.params.id);


        const resultado =
            await {function_name}(
                {id_argument}
            );


        return res.status(200).json({{

            message:
                "Registro eliminado correctamente",

            data:
                resultado,

        }});


    }} catch (error) {{

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {{

            return res.status(404).json({{

                message:
                    error.message,

            }});
        }}


        return res.status(500).json({{

            message:
                "Error al eliminar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER CUSTOM
# ============================================================

def generate_custom_controller(
    function_name,
    arguments
):

    parsed = parse_arguments(
        arguments
    )

    calls = []

    for argument in parsed:

        if argument == "data":

            calls.append(
                "req.body"
            )

        elif argument.startswith("id"):

            calls.append(
                f"Number(req.params.{argument})"
            )

        else:

            calls.append(
                f"req.body.{argument}"
            )

    call = ",\n                ".join(
        calls
    )

    return f"""
// =========================================================
// {function_name.upper()}
// =========================================================

export const {function_name}Controller = async (

    req: Request,

    res: Response

) => {{

    try {{

        const resultado =
            await {function_name}(
                {call}
            );


        return res.status(200).json(
            resultado
        );


    }} catch (error) {{

        console.error(error);


        return res.status(500).json({{

            message:
                "Error al ejecutar la operación",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        }});
    }}
}};
"""


# ============================================================
# GENERAR CONTROLLER COMPLETO
# ============================================================

def generate_controller(
    service_file,
    content
):

    service_name = service_name_from_file(
        service_file
    )

    functions = parse_functions(
        content
    )

    if not functions:

        print(
            f"⚠️ No se encontraron funciones "
            f"en {service_file.name}"
        )

        return None

    lines = []

    lines.append(
        f"// cotimed-api/src/controllers/"
        f"{service_name}.controller.ts"
    )

    lines.append("")

    lines.append(
        'import { Request, Response } from "express";'
    )

    lines.append("")

    lines.append(
        f'import * as service from "../services/'
        f'{service_name}.service";'
    )

    lines.append("")

    lines.append(
        "// ========================================================="
    )

    lines.append(
        "// CONTROLLER"
    )

    lines.append(
        "// ========================================================="
    )

    for function in functions:

        name = function["name"]

        arguments = function["arguments"]

        operation = detect_operation(
            name
        )

        if operation == "list":

            controller = (
                generate_list_controller(
                    name
                )
            )

        elif operation == "find":

            controller = (
                generate_find_controller(
                    name,
                    arguments
                )
            )

        elif operation == "create":

            controller = (
                generate_create_controller(
                    name
                )
            )

        elif operation == "update":

            controller = (
                generate_update_controller(
                    name,
                    arguments
                )
            )

        elif operation == "delete":

            controller = (
                generate_delete_controller(
                    name,
                    arguments
                )
            )

        else:

            controller = (
                generate_custom_controller(
                    name,
                    arguments
                )
            )

        # Cambiar llamada directa al service
        # por service.funcion()
        controller = controller.replace(
            f"await {name}(",
            f"await service.{name}("
        )

        lines.append(
            controller
        )

    return "\n".join(lines)


# ============================================================
# PROCESAR SERVICES
# ============================================================

def process_services():

    if not SERVICES_DIR.exists():

        print(
            f"❌ No existe: {SERVICES_DIR}"
        )

        return

    CONTROLLERS_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    files = list(
        SERVICES_DIR.glob(
            "*.service.ts"
        )
    )

    if not files:

        print(
            "❌ No se encontraron services."
        )

        return

    print()
    print("=" * 70)
    print("        GENERADOR AUTOMÁTICO DE CONTROLLERS")
    print("=" * 70)
    print()

    print(
        f"📦 Services encontrados: {len(files)}"
    )

    print()

    generated = 0

    for service_file in files:

        print(
            f"⚙️ Procesando "
            f"{service_file.name}..."
        )

        content = service_file.read_text(
            encoding="utf-8"
        )

        controller = generate_controller(
            service_file,
            content
        )

        if controller is None:
            continue

        service_name = service_name_from_file(
            service_file
        )

        output = (
            CONTROLLERS_DIR
            / f"{service_name}.controller.ts"
        )

        output.write_text(
            controller,
            encoding="utf-8"
        )

        print(
            f"   ✅ {output}"
        )

        generated += 1

    print()
    print("=" * 70)
    print(
        f"✅ Controllers generados: {generated}"
    )
    print("=" * 70)
    print()


# ============================================================
# EJECUTAR
# ============================================================

if __name__ == "__main__":

    process_services()