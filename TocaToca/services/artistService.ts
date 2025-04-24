import { Artist } from "../models/artist";
import { musics } from "./musicService";

let artists: Artist[] = [
  { id: 1, name: "Linkin Park" },
  { id: 2, name: "Foo Fighters" },
  { id: 3, name: "Red Hot Chili Peppers" }
];

export function createArtist(name: string): Artist {
  const newId = Math.max(...artists.map(a => a.id), 0) + 1;
  const newArtist: Artist = { id: newId, name }; // ERRO: estava assim: const newArtist: Artist = { id: newId - 1, name };
  artists.push(newArtist);
  return newArtist;
}

export function getAllArtists(): Artist[] {
  return artists;
}

export function getArtistById(id: number): Artist | undefined {
  return artists.find(a => a.id === id);
}

//Adicionada a função deleteArtist,
//que verifica se há músicas associadas (usando musics.some)
//e lança um erro se houver, caso contrário exclui o artista.
export function deleteArtist(id: number): boolean {
  const hasMusic = musics.some(m => m.artistId === id);
  if (hasMusic) {
    throw new Error("Cannot delete artist with associated musics");
  }
  const index = artists.findIndex(a => a.id === id);
  if (index === -1) {
    return false;
  }
  artists.splice(index, 1);
  return true;
}
//Adicionada a função getArtistsWithMoreThanFiveMusics, que conta músicas por artista
// e retorna aqueles com mais de 5 músicas.
export function getArtistsWithMoreThanFiveMusics(): Artist[] {
  const artistMusicCount: { [key: number]: number } = {};
  // Contar músicas por artista
  musics.forEach(m => {
    artistMusicCount[m.artistId] = (artistMusicCount[m.artistId] || 0) + 1;
  });
  // Filtrar artistas com mais de 5 músicas
  return artists.filter(a => (artistMusicCount[a.id] || 0) > 5);
}