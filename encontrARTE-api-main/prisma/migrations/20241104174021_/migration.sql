-- CreateTable
CREATE TABLE "MedicationStock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dose" INTEGER NOT NULL,
    "numberOfPills" INTEGER NOT NULL,
    "numberOfPackages" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "MedicationStock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicationStock" ADD CONSTRAINT "MedicationStock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
