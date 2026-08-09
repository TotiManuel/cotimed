/*
  Warnings:

  - You are about to drop the `Equipamiento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Equipamiento";

-- CreateTable
CREATE TABLE "Equipamento" (
    "id_equipamento" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "nombre_equipamento" TEXT NOT NULL,
    "marca_equipamento" TEXT NOT NULL,
    "modelo_equipamento" TEXT NOT NULL,
    "categoria_equipamento" TEXT NOT NULL,
    "descripcion_equipamento" TEXT NOT NULL,
    "precio_unitario_equipamento" DOUBLE PRECISION NOT NULL,
    "plazo_entrega_dias" INTEGER NOT NULL,
    "garantia_meses" INTEGER NOT NULL,
    "incluye" JSONB NOT NULL,
    "especificaciones_equipamento" TEXT NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id_equipamento")
);
