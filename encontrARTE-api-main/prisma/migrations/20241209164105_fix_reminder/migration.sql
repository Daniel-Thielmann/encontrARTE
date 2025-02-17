/*
  Warnings:

  - Added the required column `medication_id` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "endsWhenStockRunsOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "medication_id" TEXT NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "MedicationStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
