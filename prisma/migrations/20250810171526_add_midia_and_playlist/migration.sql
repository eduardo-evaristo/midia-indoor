-- CreateTable
CREATE TABLE "Midia" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "idPlaylist" INTEGER NOT NULL,

    CONSTRAINT "Midia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "intervalo" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Midia_uuid_key" ON "Midia"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_nome_key" ON "Playlist"("nome");

-- AddForeignKey
ALTER TABLE "Midia" ADD CONSTRAINT "Midia_idPlaylist_fkey" FOREIGN KEY ("idPlaylist") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
