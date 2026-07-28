-- CreateTable
CREATE TABLE "public"."Equipamiento" (
    "id" SERIAL NOT NULL,
    "proveedorId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" TEXT NOT NULL,
    "marca" TEXT,
    "modelo" TEXT,
    "precio" DECIMAL(65,30),
    "moneda" TEXT NOT NULL DEFAULT 'ARS',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipamiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Equipamiento_proveedorId_idx" ON "public"."Equipamiento"("proveedorId");

-- CreateIndex
CREATE INDEX "Equipamiento_categoria_idx" ON "public"."Equipamiento"("categoria");

-- AddForeignKey
ALTER TABLE "public"."Equipamiento" ADD CONSTRAINT "Equipamiento_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "public"."Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
