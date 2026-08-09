def Pagina_publica():
    print("Creo pages/public/Nombre_de_la_pagina.tsx")
    print("En App.tsx agregar la ruta")
    print("En header.tsx agregar el link (Si quiero que aparezca en el menu)")
  
def Backend_API(): 
    print("cotimed-api/prisma/schema.prisma (Base de datos)(Si hace falta)")
    print("npx prisma migrate dev --name QueSeAgrega (Si hace falta)")
    print("")
    print("LOGICA DE NEGOCIO")
    print("")
    print("Archivo: cotimed-api/src/services/Nombre_del_servicio.service.ts")
    print("Funciones: listar, crear, actualizar, eliminar, buscar")
    print("")
    print("Archivo: cotimed-api/src/controllers/Nombre_del_servicio.controller.ts")
    print("Archivo: cotimed-api/src/routes/Nombre_del_servicio.routes.ts")
    print("Archivo: cotimed-api/src/routes/index.ts (Agregar la ruta)")
    print("")

def Frontend():
    print("Archivo: src/services/Nombre_del_servicio.service.ts")
    print("Consumo de API")
    print("")
    print("Archivo: src/pages/usuario/Nombre_de_la_pagina.tsx")
    print("Archivo: src/App.tsx (Agregar la ruta)")
    print("")
    print("SEGURIDAD (Si hace falta)")
    print("Archivo: src/context/AuthContext.tsx")
    print("Archivo: src/routes/ProtectedRoute.tsx")

def Resumen():
    print("1. schema.prisma")
    print("2. migracion prisma")
    print("3. services (backend)")
    print("4. controllers (backend)")
    print("5. routes (backend)")
    print("6. routes/index.ts (backend)")
    print("7. services (frontend)")
    print("8. pages (frontend)")
    print("9. App.tsx (frontend)")
    print("10. Subida a git")

def menu():
    print("Bienvenido al menú de ayuda. Por favor, seleccione una opción:")
    print("1. Nueva pagina publica")
    print("2. Backend API")
    print("3. Frontend")
    print("4. Resumen")
    print("5. Salir")

    opcion = input("Ingrese el número de la opción deseada: ")

    if opcion == "1":
        Pagina_publica()
    elif opcion == "2":
        Backend_API()
    elif opcion == "3":
        Frontend()
    elif opcion == "4":
        Resumen()
    elif opcion == "5":
        print("Saliendo del menú de ayuda. ¡Hasta luego!")
        return
    else:
        print("Opción inválida. Por favor, intente nuevamente.")
        menu()