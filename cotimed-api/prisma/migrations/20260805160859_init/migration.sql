-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'institucion', 'proveedor');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Role" NOT NULL,
    "organizacion" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id_solicitud" SERIAL NOT NULL,
    "titulo_solicitud" TEXT NOT NULL,
    "equipamiento_solicitud" TEXT NOT NULL,
    "descripcion_solicitud" TEXT NOT NULL,
    "cantidad_solicitud" INTEGER NOT NULL,
    "urgencia_solicitud" TEXT NOT NULL,
    "estado_solicitud" TEXT NOT NULL,
    "fecha_creacion_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_institucion" INTEGER NOT NULL,
    "nombre_institucion" TEXT NOT NULL,
    "especificaciones_solicitud" TEXT NOT NULL,
    "presupuesto_estimado_solicitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "Cotizacion" (
    "id_cotizacion" SERIAL NOT NULL,
    "id_solicitud" INTEGER NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "nombre_proveedor" TEXT NOT NULL,
    "precio_unitario_cotizacion" DOUBLE PRECISION NOT NULL,
    "precio_total_cotizacion" DOUBLE PRECISION NOT NULL,
    "plazo_entrega_dias_cotizacion" INTEGER NOT NULL,
    "garantia_meses_cotizacion" INTEGER NOT NULL,
    "descripcion_cotizacion" TEXT NOT NULL,
    "estado_cotizacion" TEXT NOT NULL,
    "fecha_envio_cotizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id_cotizacion")
);

-- CreateTable
CREATE TABLE "IncluyeCotizacion" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_cotizacion" INTEGER NOT NULL,

    CONSTRAINT "IncluyeCotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_id_institucion_fkey" FOREIGN KEY ("id_institucion") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_id_solicitud_fkey" FOREIGN KEY ("id_solicitud") REFERENCES "Solicitud"("id_solicitud") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotizacion" ADD CONSTRAINT "Cotizacion_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncluyeCotizacion" ADD CONSTRAINT "IncluyeCotizacion_id_cotizacion_fkey" FOREIGN KEY ("id_cotizacion") REFERENCES "Cotizacion"("id_cotizacion") ON DELETE RESTRICT ON UPDATE CASCADE;
