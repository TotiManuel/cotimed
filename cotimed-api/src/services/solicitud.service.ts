model Solicitud {
  id Int @id @default(autoincrement())
  numero String @unique
  titulo String
  descripcion String
  institucion_id Int
  creado_por_id Int
  estado EstadoSolicitud @default(BORRADOR)
  urgencia NivelUrgencia @default(MEDIA)
  fecha_publicacion DateTime?
  fecha_limite_cotizacion DateTime?
  fecha_cierre DateTime?
  presupuesto_estimado Decimal? @db.Decimal(15, 2)
  moneda TipoMoneda @default(ARS)
  condiciones String?
  observaciones String?
  lugar_entrega String?
  requiere_instalacion Boolean @default(false)
  requiere_capacitacion Boolean @default(false)
  fecha_creacion DateTime @default(now())
  fecha_actualizacion DateTime @updatedAt
  eliminado Boolean @default(false)
}

LISTAR
BUSCAR POR ID
CREAR
ACTUALIZAR
ELIMINAR
