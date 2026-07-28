/*
  Warnings:

  - A unique constraint covering the columns `[solicitudId,proveedorId]` on the table `Cotizacion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Cotizacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Institucion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Proveedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cotizacion" ADD COLUMN     "incluyeEnvio" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moneda" TEXT NOT NULL DEFAULT 'ARS',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Institucion" ADD COLUMN     "nombreComercial" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Proveedor" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Solicitud" ADD COLUMN     "archivoAdjunto" TEXT,
ADD COLUMN     "fechaNecesidad" TIMESTAMP(3),
ADD COLUMN     "marcaPreferida" TEXT,
ADD COLUMN     "modeloPreferido" TEXT,
ADD COLUMN     "presupuestoMax" DECIMAL(65,30),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."DestinatarioSolicitud" (
    "id" SERIAL NOT NULL,
    "solicitudId" INTEGER NOT NULL,
    "proveedorId" INTEGER NOT NULL,
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "visto" BOOLEAN NOT NULL DEFAULT false,
    "respondido" BOOLEAN NOT NULL DEFAULT false,
    "fechaEnvio" TIMESTAMP(3),
    "fechaRespuesta" TIMESTAMP(3),

    CONSTRAINT "DestinatarioSolicitud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DestinatarioSolicitud_solicitudId_idx" ON "public"."DestinatarioSolicitud"("solicitudId");

-- CreateIndex
CREATE INDEX "DestinatarioSolicitud_proveedorId_idx" ON "public"."DestinatarioSolicitud"("proveedorId");

-- CreateIndex
CREATE INDEX "DestinatarioSolicitud_visto_idx" ON "public"."DestinatarioSolicitud"("visto");

-- CreateIndex
CREATE INDEX "DestinatarioSolicitud_respondido_idx" ON "public"."DestinatarioSolicitud"("respondido");

-- CreateIndex
CREATE UNIQUE INDEX "DestinatarioSolicitud_solicitudId_proveedorId_key" ON "public"."DestinatarioSolicitud"("solicitudId", "proveedorId");

-- CreateIndex
CREATE INDEX "Cotizacion_solicitudId_idx" ON "public"."Cotizacion"("solicitudId");

-- CreateIndex
CREATE INDEX "Cotizacion_proveedorId_idx" ON "public"."Cotizacion"("proveedorId");

-- CreateIndex
CREATE INDEX "Cotizacion_estado_idx" ON "public"."Cotizacion"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Cotizacion_solicitudId_proveedorId_key" ON "public"."Cotizacion"("solicitudId", "proveedorId");

-- CreateIndex
CREATE INDEX "Institucion_nombre_idx" ON "public"."Institucion"("nombre");

-- CreateIndex
CREATE INDEX "Institucion_ciudad_idx" ON "public"."Institucion"("ciudad");

-- CreateIndex
CREATE INDEX "Institucion_provincia_idx" ON "public"."Institucion"("provincia");

-- CreateIndex
CREATE INDEX "Proveedor_nombreEmpresa_idx" ON "public"."Proveedor"("nombreEmpresa");

-- CreateIndex
CREATE INDEX "Proveedor_ciudad_idx" ON "public"."Proveedor"("ciudad");

-- CreateIndex
CREATE INDEX "Proveedor_provincia_idx" ON "public"."Proveedor"("provincia");

-- CreateIndex
CREATE INDEX "Solicitud_institucionId_idx" ON "public"."Solicitud"("institucionId");

-- CreateIndex
CREATE INDEX "Solicitud_estado_idx" ON "public"."Solicitud"("estado");

-- CreateIndex
CREATE INDEX "Solicitud_categoria_idx" ON "public"."Solicitud"("categoria");

-- CreateIndex
CREATE INDEX "Solicitud_fechaNecesidad_idx" ON "public"."Solicitud"("fechaNecesidad");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_rol_idx" ON "public"."User"("rol");

-- CreateIndex
CREATE INDEX "User_estado_idx" ON "public"."User"("estado");

-- AddForeignKey
ALTER TABLE "public"."DestinatarioSolicitud" ADD CONSTRAINT "DestinatarioSolicitud_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "public"."Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DestinatarioSolicitud" ADD CONSTRAINT "DestinatarioSolicitud_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "public"."Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
