-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('DNI', 'CUIL', 'CUIT', 'PASAPORTE', 'OTRO');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'ATENCIONINSTITUCION', 'ATENCIONPROVEEDOR', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoInstitucion" AS ENUM ('PENDIENTE', 'VERIFICADO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "EstadoProveedor" AS ENUM ('PENDIENTE', 'VERIFICADO', 'BLOQUEADO');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('IMAGENES', 'LABORATORIO', 'QUIROFANO');

-- CreateEnum
CREATE TYPE "TipoEquipamiento" AS ENUM ('QUIRURGICO', 'PROTESIS', 'INSUMOS', 'UTI', 'PISO');

-- CreateEnum
CREATE TYPE "EstadoEquipamiento" AS ENUM ('NUEVO', 'USADO', 'CONSULTAR');

-- CreateEnum
CREATE TYPE "TipoPrecio" AS ENUM ('UNITARIO', 'KIT', 'CAJA');

-- CreateEnum
CREATE TYPE "TipoMoneda" AS ENUM ('ARS', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "TipoPago" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'FINANCIACION', 'CREDITO', 'CONTRA_ENTREGA', 'CHEQUE', 'DEPOSITO_BANCARIO', 'PAGO_ANTICIPADO', 'PAGO_PARCIAL', 'CONTRA_FACTURA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('BORRADOR', 'COTIZANDO', 'EVALUANDO', 'CERRADA');

-- CreateEnum
CREATE TYPE "NivelUrgencia" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "EstadoCotizacion" AS ENUM ('BORRADOR', 'ENVIADA', 'ACEPTADA', 'RECHAZADA', 'CANCELADA');

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
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "ultimo_login" TIMESTAMP(3),
    "email_verificado" BOOLEAN NOT NULL DEFAULT false,
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
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
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
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "estado" "EstadoProveedor" NOT NULL DEFAULT 'PENDIENTE',
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_verificacion" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" SERIAL NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "nombre" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "numero_parte" TEXT,
    "codigo_interno" TEXT,
    "tipo" "TipoEquipamiento" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "especificaciones" TEXT,
    "estado" "EstadoEquipamiento" NOT NULL DEFAULT 'NUEVO',
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
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Cotizacion" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "solicitud_id" INTEGER NOT NULL,
    "proveedor_id" INTEGER NOT NULL,
    "ItemCotizacionId" INTEGER NOT NULL,
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
    "solicitud_id" INTEGER NOT NULL,
    "equipamento_id" INTEGER,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(15,2) NOT NULL,
    "descuento" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(15,2) NOT NULL,
    "impuestos" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(15,2) NOT NULL,
    "plazo_entrega_dias" INTEGER,
    "garantia_meses" INTEGER,
    "incluye" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institucion_cuit_key" ON "Institucion"("cuit");

-- CreateIndex
CREATE UNIQUE INDEX "Institucion_email_key" ON "Institucion"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_cuit_key" ON "Proveedor"("cuit");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_email_key" ON "Proveedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitud_numero_key" ON "Solicitud"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Cotizacion_numero_key" ON "Cotizacion"("numero");
