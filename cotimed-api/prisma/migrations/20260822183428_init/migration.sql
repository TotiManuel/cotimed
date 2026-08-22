-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'INSTITUCION', 'PROVEEDOR');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'BLOQUEADO', 'PENDIENTE');

-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'CUIT', 'CUIL', 'PASAPORTE', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoInstitucion" AS ENUM ('ACTIVA', 'INACTIVA', 'PENDIENTE', 'SUSPENDIDA');

-- CreateEnum
CREATE TYPE "EstadoProveedor" AS ENUM ('ACTIVO', 'INACTIVO', 'PENDIENTE', 'SUSPENDIDO');

-- CreateEnum
CREATE TYPE "TipoContacto" AS ENUM ('PRINCIPAL', 'COMERCIAL', 'TECNICO', 'ADMINISTRATIVO', 'FACTURACION', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoDireccion" AS ENUM ('PRINCIPAL', 'COMERCIAL', 'ENTREGA', 'FACTURACION', 'OTRA');

-- CreateEnum
CREATE TYPE "EstadoEquipamiento" AS ENUM ('ACTIVO', 'INACTIVO', 'AGOTADO', 'DISCONTINUADO');

-- CreateEnum
CREATE TYPE "TipoEquipamiento" AS ENUM ('EQUIPAMIENTO_MEDICO', 'INSTRUMENTAL', 'MOBILIARIO', 'INSUMO', 'TECNOLOGIA', 'DIAGNOSTICO', 'QUIRURGICO', 'ODONTOLOGICO', 'LABORATORIO', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoPrecio" AS ENUM ('UNITARIO', 'POR_KIT', 'POR_PAQUETE', 'POR_CAJA', 'POR_UNIDAD', 'CONSULTAR');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('BORRADOR', 'PUBLICADA', 'ABIERTA', 'EN_COTIZACION', 'COTIZADA', 'EN_EVALUACION', 'ADJUDICADA', 'RECHAZADA', 'CANCELADA', 'CERRADA');

-- CreateEnum
CREATE TYPE "NivelUrgencia" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "EstadoCotizacion" AS ENUM ('BORRADOR', 'ENVIADA', 'RECIBIDA', 'EN_REVISION', 'ACEPTADA', 'RECHAZADA', 'VENCIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "EstadoItemCotizacion" AS ENUM ('COTIZADO', 'NO_DISPONIBLE', 'CONSULTAR', 'PARCIAL');

-- CreateEnum
CREATE TYPE "TipoMoneda" AS ENUM ('ARS', 'USD', 'EUR', 'BRL', 'CLP', 'UYU', 'OTRA');

-- CreateEnum
CREATE TYPE "TipoPago" AS ENUM ('CONTADO', 'TRANSFERENCIA', 'TARJETA', 'FINANCIACION', 'CREDITO', 'CONTRA_ENTREGA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoAdjudicacion" AS ENUM ('PENDIENTE', 'PARCIAL', 'COMPLETA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoDocumentoArchivo" AS ENUM ('COTIZACION', 'FACTURA', 'MANUAL', 'CERTIFICADO', 'FICHA_TECNICA', 'IMAGEN', 'CONTRATO', 'OTRO');

-- CreateEnum
CREATE TYPE "TipoNotificacion" AS ENUM ('NUEVA_SOLICITUD', 'NUEVA_COTIZACION', 'COTIZACION_ACEPTADA', 'COTIZACION_RECHAZADA', 'SOLICITUD_VENCIDA', 'NUEVO_MENSAJE', 'SISTEMA');

-- CreateEnum
CREATE TYPE "TipoMensaje" AS ENUM ('CONSULTA', 'RESPUESTA', 'GENERAL', 'NEGOCIACION');

-- CreateEnum
CREATE TYPE "EstadoMensaje" AS ENUM ('ENVIADO', 'LEIDO', 'ELIMINADO');

-- CreateEnum
CREATE TYPE "TipoAuditoria" AS ENUM ('CREACION', 'ACTUALIZACION', 'ELIMINACION', 'LOGIN', 'LOGOUT', 'CAMBIO_ESTADO', 'COTIZACION', 'ADJUDICACION', 'OTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telefono" TEXT,
    "tipo_documento" "TipoDocumento",
    "numero_documento" TEXT,
    "rol" "RolUsuario" NOT NULL,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "avatar_url" TEXT,
    "ultimo_login" TIMESTAMP(3),
    "email_verificado" BOOLEAN NOT NULL DEFAULT false,
    "institucion_id" INTEGER,
    "proveedor_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institucion" (
    "id" SERIAL NOT NULL,
    "razon_social" TEXT NOT NULL,
    "nombre_comercial" TEXT,
    "cuit" TEXT,
    "descripcion" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "sitio_web" TEXT,
    "logo_url" TEXT,
    "estado" "EstadoInstitucion" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Institucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" SERIAL NOT NULL,
    "razon_social" TEXT NOT NULL,
    "nombre_comercial" TEXT,
    "cuit" TEXT,
    "descripcion" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "sitio_web" TEXT,
    "logo_url" TEXT,
    "estado" "EstadoProveedor" NOT NULL DEFAULT 'PENDIENTE',
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_verificacion" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoDireccion" NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT,
    "piso" TEXT,
    "departamento" TEXT,
    "codigo_postal" TEXT,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION,
    "longitud" DOUBLE PRECISION,
    "institucion_id" INTEGER,
    "proveedor_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "cargo" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "tipo" "TipoContacto" NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "institucion_id" INTEGER,
    "proveedor_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen_url" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "categoria_padre_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" SERIAL NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "numero_parte" TEXT,
    "codigo_interno" TEXT,
    "tipo" "TipoEquipamiento" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "especificaciones" TEXT,
    "estado" "EstadoEquipamiento" NOT NULL DEFAULT 'ACTIVO',
    "precio_unitario" DECIMAL(15,2) NOT NULL,
    "tipo_precio" "TipoPrecio" NOT NULL DEFAULT 'UNITARIO',
    "moneda" "TipoMoneda" NOT NULL DEFAULT 'ARS',
    "stock" INTEGER,
    "stock_minimo" INTEGER,
    "plazo_entrega_dias" INTEGER,
    "garantia_meses" INTEGER,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "fabricante" TEXT,
    "origen" TEXT,
    "registro_sanitario" TEXT,
    "vida_util_anios" INTEGER,
    "requiere_instalacion" BOOLEAN NOT NULL DEFAULT false,
    "requiere_capacitacion" BOOLEAN NOT NULL DEFAULT false,
    "incluye" JSONB,
    "accesorios" JSONB,
    "caracteristicas" JSONB,
    "imagen_principal" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenEquipamento" (
    "id" SERIAL NOT NULL,
    "equipamento_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagenEquipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipamentoFavorito" (
    "id" SERIAL NOT NULL,
    "equipamento_id" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "institucion_id" INTEGER,
    "proveedor_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipamentoFavorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "institucion_id" INTEGER NOT NULL,
    "creado_por_id" INTEGER NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'BORRADOR',
    "urgencia" "NivelUrgencia" NOT NULL DEFAULT 'MEDIA',
    "fecha_publicacion" TIMESTAMP(3),
    "fecha_limite_cotizacion" TIMESTAMP(3),
    "fecha_cierre" TIMESTAMP(3),
    "presupuesto_estimado" DECIMAL(15,2),
    "moneda" "TipoMoneda" NOT NULL DEFAULT 'ARS',
    "condiciones" TEXT,
    "observaciones" TEXT,
    "lugar_entrega" TEXT,
    "requiere_instalacion" BOOLEAN NOT NULL DEFAULT false,
    "requiere_capacitacion" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSolicitud" (
    "id" SERIAL NOT NULL,
    "solicitud_id" INTEGER NOT NULL,
    "equipamento_id" INTEGER,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,
    "especificaciones" TEXT,
    "marca_preferida" TEXT,
    "modelo_preferido" TEXT,
    "unidad_medida" TEXT,
    "presupuesto_unitario" DECIMAL(15,2),
    "presupuesto_total" DECIMAL(15,2),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemSolicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "solicitud_id" INTEGER NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "estado" "EstadoCotizacion" NOT NULL DEFAULT 'BORRADOR',
    "moneda" "TipoMoneda" NOT NULL DEFAULT 'ARS',
    "subtotal" DECIMAL(15,2) NOT NULL,
    "impuestos" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "descuento" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "envio" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(15,2) NOT NULL,
    "plazo_entrega_dias" INTEGER,
    "garantia_meses" INTEGER,
    "validez_dias" INTEGER,
    "fecha_vencimiento" TIMESTAMP(3),
    "condiciones_pago" "TipoPago",
    "condiciones" TEXT,
    "observaciones" TEXT,
    "fecha_envio" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCotizacion" (
    "id" SERIAL NOT NULL,
    "cotizacion_id" INTEGER NOT NULL,
    "item_solicitud_id" INTEGER,
    "equipamento_id" INTEGER,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(15,2) NOT NULL,
    "descuento" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(15,2) NOT NULL,
    "impuestos" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(15,2) NOT NULL,
    "estado" "EstadoItemCotizacion" NOT NULL DEFAULT 'COTIZADO',
    "plazo_entrega_dias" INTEGER,
    "garantia_meses" INTEGER,
    "incluye" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjudicacion" (
    "id" SERIAL NOT NULL,
    "solicitud_id" INTEGER NOT NULL,
    "cotizacion_id" INTEGER NOT NULL,
    "estado" "EstadoAdjudicacion" NOT NULL DEFAULT 'PENDIENTE',
    "monto_total" DECIMAL(15,2) NOT NULL,
    "moneda" "TipoMoneda" NOT NULL,
    "observaciones" TEXT,
    "fecha_adjudicacion" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adjudicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensaje" (
    "id" SERIAL NOT NULL,
    "solicitud_id" INTEGER,
    "cotizacion_id" INTEGER,
    "remitente_id" INTEGER NOT NULL,
    "tipo" "TipoMensaje" NOT NULL DEFAULT 'GENERAL',
    "contenido" TEXT NOT NULL,
    "estado" "EstadoMensaje" NOT NULL DEFAULT 'ENVIADO',
    "fecha_lectura" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archivo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombre_original" TEXT,
    "url" TEXT NOT NULL,
    "tipo_mime" TEXT,
    "extension" TEXT,
    "tamanio_bytes" INTEGER,
    "tipo" "TipoDocumentoArchivo" NOT NULL,
    "usuario_id" INTEGER,
    "solicitud_id" INTEGER,
    "cotizacion_id" INTEGER,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo" "TipoNotificacion" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "url" TEXT,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "fecha_lectura" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "tipo" "TipoAuditoria" NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidad_id" INTEGER,
    "accion" TEXT NOT NULL,
    "descripcion" TEXT,
    "datos_anteriores" JSONB,
    "datos_nuevos" JSONB,
    "ip" TEXT,
    "user_agent" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_rol_idx" ON "Usuario"("rol");

-- CreateIndex
CREATE INDEX "Usuario_estado_idx" ON "Usuario"("estado");

-- CreateIndex
CREATE INDEX "Usuario_institucion_id_idx" ON "Usuario"("institucion_id");

-- CreateIndex
CREATE INDEX "Usuario_proveedor_id_idx" ON "Usuario"("proveedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Institucion_cuit_key" ON "Institucion"("cuit");

-- CreateIndex
CREATE INDEX "Institucion_razon_social_idx" ON "Institucion"("razon_social");

-- CreateIndex
CREATE INDEX "Institucion_estado_idx" ON "Institucion"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_cuit_key" ON "Proveedor"("cuit");

-- CreateIndex
CREATE INDEX "Proveedor_razon_social_idx" ON "Proveedor"("razon_social");

-- CreateIndex
CREATE INDEX "Proveedor_estado_idx" ON "Proveedor"("estado");

-- CreateIndex
CREATE INDEX "Proveedor_verificado_idx" ON "Proveedor"("verificado");

-- CreateIndex
CREATE INDEX "Direccion_institucion_id_idx" ON "Direccion"("institucion_id");

-- CreateIndex
CREATE INDEX "Direccion_proveedor_id_idx" ON "Direccion"("proveedor_id");

-- CreateIndex
CREATE INDEX "Contacto_institucion_id_idx" ON "Contacto"("institucion_id");

-- CreateIndex
CREATE INDEX "Contacto_proveedor_id_idx" ON "Contacto"("proveedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE INDEX "Categoria_categoria_padre_id_idx" ON "Categoria"("categoria_padre_id");

-- CreateIndex
CREATE INDEX "Equipamento_proveedor_id_idx" ON "Equipamento"("proveedor_id");

-- CreateIndex
CREATE INDEX "Equipamento_categoria_id_idx" ON "Equipamento"("categoria_id");

-- CreateIndex
CREATE INDEX "Equipamento_nombre_idx" ON "Equipamento"("nombre");

-- CreateIndex
CREATE INDEX "Equipamento_marca_idx" ON "Equipamento"("marca");

-- CreateIndex
CREATE INDEX "Equipamento_modelo_idx" ON "Equipamento"("modelo");

-- CreateIndex
CREATE INDEX "Equipamento_estado_idx" ON "Equipamento"("estado");

-- CreateIndex
CREATE INDEX "Equipamento_disponible_idx" ON "Equipamento"("disponible");

-- CreateIndex
CREATE INDEX "ImagenEquipamento_equipamento_id_idx" ON "ImagenEquipamento"("equipamento_id");

-- CreateIndex
CREATE INDEX "EquipamentoFavorito_equipamento_id_idx" ON "EquipamentoFavorito"("equipamento_id");

-- CreateIndex
CREATE INDEX "EquipamentoFavorito_usuario_id_idx" ON "EquipamentoFavorito"("usuario_id");

-- CreateIndex
CREATE INDEX "EquipamentoFavorito_institucion_id_idx" ON "EquipamentoFavorito"("institucion_id");

-- CreateIndex
CREATE UNIQUE INDEX "EquipamentoFavorito_equipamento_id_usuario_id_key" ON "EquipamentoFavorito"("equipamento_id", "usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitud_numero_key" ON "Solicitud"("numero");

-- CreateIndex
CREATE INDEX "Solicitud_institucion_id_idx" ON "Solicitud"("institucion_id");

-- CreateIndex
CREATE INDEX "Solicitud_creado_por_id_idx" ON "Solicitud"("creado_por_id");

-- CreateIndex
CREATE INDEX "Solicitud_estado_idx" ON "Solicitud"("estado");

-- CreateIndex
CREATE INDEX "Solicitud_urgencia_idx" ON "Solicitud"("urgencia");

-- CreateIndex
CREATE INDEX "Solicitud_fecha_creacion_idx" ON "Solicitud"("fecha_creacion");

-- CreateIndex
CREATE INDEX "Solicitud_fecha_limite_cotizacion_idx" ON "Solicitud"("fecha_limite_cotizacion");

-- CreateIndex
CREATE INDEX "ItemSolicitud_solicitud_id_idx" ON "ItemSolicitud"("solicitud_id");

-- CreateIndex
CREATE INDEX "ItemSolicitud_equipamento_id_idx" ON "ItemSolicitud"("equipamento_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cotizacion_numero_key" ON "Cotizacion"("numero");

-- CreateIndex
CREATE INDEX "Cotizacion_solicitud_id_idx" ON "Cotizacion"("solicitud_id");

-- CreateIndex
CREATE INDEX "Cotizacion_proveedor_id_idx" ON "Cotizacion"("proveedor_id");

-- CreateIndex
CREATE INDEX "Cotizacion_estado_idx" ON "Cotizacion"("estado");

-- CreateIndex
CREATE INDEX "Cotizacion_fecha_creacion_idx" ON "Cotizacion"("fecha_creacion");

-- CreateIndex
CREATE UNIQUE INDEX "Cotizacion_solicitud_id_proveedor_id_key" ON "Cotizacion"("solicitud_id", "proveedor_id");

-- CreateIndex
CREATE INDEX "ItemCotizacion_cotizacion_id_idx" ON "ItemCotizacion"("cotizacion_id");

-- CreateIndex
CREATE INDEX "ItemCotizacion_equipamento_id_idx" ON "ItemCotizacion"("equipamento_id");

-- CreateIndex
CREATE INDEX "ItemCotizacion_item_solicitud_id_idx" ON "ItemCotizacion"("item_solicitud_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adjudicacion_solicitud_id_key" ON "Adjudicacion"("solicitud_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adjudicacion_cotizacion_id_key" ON "Adjudicacion"("cotizacion_id");

-- CreateIndex
CREATE INDEX "Adjudicacion_cotizacion_id_idx" ON "Adjudicacion"("cotizacion_id");

-- CreateIndex
CREATE INDEX "Adjudicacion_estado_idx" ON "Adjudicacion"("estado");

-- CreateIndex
CREATE INDEX "Mensaje_solicitud_id_idx" ON "Mensaje"("solicitud_id");

-- CreateIndex
CREATE INDEX "Mensaje_cotizacion_id_idx" ON "Mensaje"("cotizacion_id");

-- CreateIndex
CREATE INDEX "Mensaje_remitente_id_idx" ON "Mensaje"("remitente_id");

-- CreateIndex
CREATE INDEX "Mensaje_fecha_creacion_idx" ON "Mensaje"("fecha_creacion");

-- CreateIndex
CREATE INDEX "Archivo_usuario_id_idx" ON "Archivo"("usuario_id");

-- CreateIndex
CREATE INDEX "Archivo_solicitud_id_idx" ON "Archivo"("solicitud_id");

-- CreateIndex
CREATE INDEX "Archivo_cotizacion_id_idx" ON "Archivo"("cotizacion_id");

-- CreateIndex
CREATE INDEX "Notificacion_usuario_id_idx" ON "Notificacion"("usuario_id");

-- CreateIndex
CREATE INDEX "Notificacion_leida_idx" ON "Notificacion"("leida");

-- CreateIndex
CREATE INDEX "Notificacion_fecha_creacion_idx" ON "Notificacion"("fecha_creacion");

-- CreateIndex
CREATE INDEX "Auditoria_usuario_id_idx" ON "Auditoria"("usuario_id");

-- CreateIndex
CREATE INDEX "Auditoria_entidad_idx" ON "Auditoria"("entidad");

-- CreateIndex
CREATE INDEX "Auditoria_entidad_id_idx" ON "Auditoria"("entidad_id");

-- CreateIndex
CREATE INDEX "Auditoria_fecha_creacion_idx" ON "Auditoria"("fecha_creacion");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_categoria_padre_id_fkey" FOREIGN KEY ("categoria_padre_id") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenEquipamento" ADD CONSTRAINT "ImagenEquipamento_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "Equipamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentoFavorito" ADD CONSTRAINT "EquipamentoFavorito_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "Equipamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentoFavorito" ADD CONSTRAINT "EquipamentoFavorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentoFavorito" ADD CONSTRAINT "EquipamentoFavorito_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipamentoFavorito" ADD CONSTRAINT "EquipamentoFavorito_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_institucion_id_fkey" FOREIGN KEY ("institucion_id") REFERENCES "Institucion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSolicitud" ADD CONSTRAINT "ItemSolicitud_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "Solicitud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSolicitud" ADD CONSTRAINT "ItemSolicitud_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "Equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCotizacion" ADD CONSTRAINT "ItemCotizacion_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "Cotizacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCotizacion" ADD CONSTRAINT "ItemCotizacion_equipamento_id_fkey" FOREIGN KEY ("equipamento_id") REFERENCES "Equipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjudicacion" ADD CONSTRAINT "Adjudicacion_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjudicacion" ADD CONSTRAINT "Adjudicacion_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "Cotizacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "Solicitud"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivo" ADD CONSTRAINT "Archivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivo" ADD CONSTRAINT "Archivo_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "Solicitud"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archivo" ADD CONSTRAINT "Archivo_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "Cotizacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auditoria" ADD CONSTRAINT "Auditoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
