-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL,
    "numberOfPillsIngested" INTEGER NOT NULL,
    "timeOfPillIngestion" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "medication_id" TEXT NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "MedicationStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
