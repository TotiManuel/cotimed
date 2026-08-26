model Cotizacion {
  id Int @id @default(autoincrement())
  numero String @unique
  solicitud_id Int
  proveedor_id Int
  ItemCotizacionId Int
  usuario_id Int
  estado EstadoCotizacion @default(BORRADOR)
  moneda TipoMoneda @default(ARS)
  subtotal Decimal @db.Decimal(15, 2)
  impuestos Decimal @default(0) @db.Decimal(15, 2)
  descuento Decimal @default(0) @db.Decimal(15, 2)
  envio Decimal @default(0) @db.Decimal(15, 2)
  total Decimal @db.Decimal(15, 2)
  plazo_entrega_dias Int?
  garantia_meses Int?
  validez_dias Int?
  fecha_vencimiento DateTime?
  condiciones_pago TipoPago?
  condiciones String?
  observaciones String?
  fecha_envio DateTime?
  fecha_creacion DateTime @default(now())
  fecha_actualizacion DateTime @updatedAt
}

LISTAR
BUSCAR POR ID
CREAR
ACTUALIZAR
ELIMINAR
