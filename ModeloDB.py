class Role:
    def __init__(self):
        self.rol = ["admin", "institucion", "proveedor"]

class User:
    def __init__(self, id, name, email, password, rol, organizacion):
        self.id = id
        self.name_user = name
        self.email = email
        self.password = password
        self.rol = rol
        self.organizacion = organizacion
        
class Solicitud:
    def __init__(self, id, titulo, equipamiento, descripcion, cantidad, urgencia, estado, fecha_creacion, id_institucion, nombre_institucion, especificaciones, presupuesto):
        self.id_solicitud = id
        self.titulo_solicitud = titulo
        self.equipamiento_solicitud = equipamiento
        self.descripcion_solicitud = descripcion
        self.cantidad_solicitud = cantidad
        self.urgencia_solicitud = urgencia
        self.estado_solicitud = estado
        self.fecha_creacion_solicitud = fecha_creacion
        self.id_institucion = id_institucion
        self.nombre_institucion = nombre_institucion
        self.especificaciones_solicitud = especificaciones
        self.presupuesto_estimado_solicitud = presupuesto

class Cotizacion:
    def __init__(self, id, id_solicitud, id_proveedor, nombre_proveedor, precio_unitario, precio_total, plazo_entrega, garantia, descripcion, estado, fecha_envio):
        self.id_cotizacion = id
        self.id_solicitud = id_solicitud
        self.id_proveedor = id_proveedor
        self.nombre_proveedor = nombre_proveedor
        self.precio_unitario_cotizacion = precio_unitario
        self.precio_total_cotizacion = precio_total
        self.plazo_entrega_dias_cotizacion = plazo_entrega
        self.garantia_meses_cotizacion = garantia
        self.descripcion_cotizacion = descripcion
        self.estado_cotizacion = estado
        self.fecha_envio_cotizacion = fecha_envio
        self.incluye_cotizacion = []
        
institucion = User(1, "Juan Perez", "juan@example.com", "password123", Role().rol[1], "Institución XYZ")
proveedor = User(2, "Juan Diaz", "juan@example.com", "password123", Role().rol[2], "Proveedor ABC")

solicitud = Solicitud(1, "Solicitud de Equipamiento", "Equipo de Computación", "Descripción de la solicitud", 10, "Alta", "Pendiente", "2023-01-01", institucion.id, institucion.organizacion, "Especificaciones", 10000)

cotizacion = Cotizacion(1, solicitud.id_solicitud, proveedor.id, proveedor.name_user, 500, 5000, 30, 12, "Descripción de la cotización", "Enviado", "2023-01-02")
cotizacion.incluye_cotizacion.append("Incluye instalación y soporte técnico")
cotizacion.incluye_cotizacion.append("Incluye garantía extendida de 12 meses")

print(institucion.name_user, institucion.organizacion, institucion.rol, institucion.email)
print(proveedor.name_user, proveedor.organizacion, proveedor.rol, proveedor.email)
print(solicitud.titulo_solicitud, solicitud.equipamiento_solicitud, solicitud.descripcion_solicitud, solicitud.cantidad_solicitud, solicitud.urgencia_solicitud, solicitud.estado_solicitud, solicitud.fecha_creacion_solicitud, solicitud.id_institucion, solicitud.nombre_institucion, solicitud.especificaciones_solicitud, solicitud.presupuesto_estimado_solicitud)
print(cotizacion.nombre_proveedor, cotizacion.precio_unitario_cotizacion, cotizacion.precio_total_cotizacion, cotizacion.plazo_entrega_dias_cotizacion, cotizacion.garantia_meses_cotizacion, cotizacion.descripcion_cotizacion, cotizacion.estado_cotizacion, cotizacion.fecha_envio_cotizacion)
for coti in cotizacion.incluye_cotizacion:
    print(coti)
