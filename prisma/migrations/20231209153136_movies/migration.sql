/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorySlug` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "categorySlug" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MovieCategory" (
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "MovieCategory_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "MovieTag" (
    "name" VARCHAR(255) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "MovieTag_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "_MovieToMovieTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieCategory_slug_key" ON "MovieCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MovieTag_slug_key" ON "MovieTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToMovieTag_AB_unique" ON "_MovieToMovieTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToMovieTag_B_index" ON "_MovieToMovieTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "MovieCategory"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToMovieTag" ADD CONSTRAINT "_MovieToMovieTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToMovieTag" ADD CONSTRAINT "_MovieToMovieTag_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieTag"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
