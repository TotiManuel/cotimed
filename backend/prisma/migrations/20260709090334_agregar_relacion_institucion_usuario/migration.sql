-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "institucionId" INTEGER;

-- CreateIndex
CREATE INDEX "User_institucionId_idx" ON "public"."User"("institucionId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_institucionId_fkey" FOREIGN KEY ("institucionId") REFERENCES "public"."Institucion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
