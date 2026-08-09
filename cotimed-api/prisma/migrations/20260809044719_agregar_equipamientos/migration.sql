-- CreateTable
CREATE TABLE "Equipamiento" (
    "id_equipamiento" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "nombre_equipamiento" TEXT NOT NULL,
    "marca_equipamiento" TEXT NOT NULL,
    "modelo_equipamiento" TEXT NOT NULL,
    "categoria_equipamiento" TEXT NOT NULL,
    "descripcion_equipamiento" TEXT NOT NULL,
    "precio_unitario_equipamiento" DOUBLE PRECISION NOT NULL,
    "plazo_entrega_dias" INTEGER NOT NULL,
    "garantia_meses" INTEGER NOT NULL,
    "incluye" JSONB NOT NULL,
    "especificaciones_equipamiento" TEXT NOT NULL,

    CONSTRAINT "Equipamiento_pkey" PRIMARY KEY ("id_equipamiento")
);
