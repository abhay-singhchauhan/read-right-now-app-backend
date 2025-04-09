-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "teacher_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
