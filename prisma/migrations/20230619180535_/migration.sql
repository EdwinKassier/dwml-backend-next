/*
  Warnings:

  - You are about to drop the column `AVERAGE` on the `Results` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "QUERY" TEXT NOT NULL,
    "SYMBOL" TEXT NOT NULL,
    "NUMBERCOINS" REAL NOT NULL,
    "PROFIT" REAL NOT NULL,
    "GROWTHFACTOR" REAL NOT NULL,
    "LAMBOS" REAL NOT NULL,
    "INVESTMENT" REAL NOT NULL,
    "GENERATIONDATE" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Results" ("GENERATIONDATE", "GROWTHFACTOR", "INVESTMENT", "LAMBOS", "NUMBERCOINS", "PROFIT", "QUERY", "SYMBOL", "id") SELECT "GENERATIONDATE", "GROWTHFACTOR", "INVESTMENT", "LAMBOS", "NUMBERCOINS", "PROFIT", "QUERY", "SYMBOL", "id" FROM "Results";
DROP TABLE "Results";
ALTER TABLE "new_Results" RENAME TO "Results";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
