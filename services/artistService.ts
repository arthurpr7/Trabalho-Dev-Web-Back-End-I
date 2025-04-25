import { Artist } from "../models/artist";
import { musics } from "./musicService";

let artists: Artist[] = [
  { id: 1, name: "Linkin Park" },
  { id: 2, name: "Foo Fighters" },
  { id: 3, name: "Red Hot Chili Peppers" }
];

/**
 * Cria um novo artista e o adiciona à lista existente.
 * O ID é gerado automaticamente com base no maior ID atual.
 * 
 * @param name Nome do novo artista
 * @returns O objeto do artista criado
 */
export function createArtist(name: string): Artist {
  const newId = Math.max(...artists.map(a => a.id), 0) + 1;
  const newArtist: Artist = { id: newId, name };
  artists.push(newArtist);
  return newArtist;
}

/**
 * Retorna a lista completa de artistas cadastrados.
 * 
 * @returns Array com todos os artistas
 */
export function getAllArtists(): Artist[] {
  return artists;
}

/**
 * Busca um artista com base no ID fornecido.
 * 
 * @param id ID numérico do artista a ser buscado
 * @returns O artista correspondente ou undefined se não encontrado
 */
export function getArtistById(id: number): Artist | undefined {
  return artists.find(a => a.id === id);
}

/**
 * Remove um artista do sistema com base no ID.
 * A exclusão só é permitida se o artista não possuir músicas associadas.
 * 
 * @param id ID do artista a ser deletado
 * @returns true se o artista foi removido, false se não encontrado
 * @throws Erro se o artista tiver músicas associadas
 */
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

/**
 * Retorna os artistas que possuem mais de cinco músicas cadastradas.
 * Útil para análises ou recomendações com base em volume de produção musical.
 * 
 * @returns Lista de artistas com mais de 5 músicas
 */
export function getArtistsWithMoreThanFiveMusics(): Artist[] {
  const artistMusicCount: { [key: number]: number } = {};

  musics.forEach(m => {
    artistMusicCount[m.artistId] = (artistMusicCount[m.artistId] || 0) + 1;
  });

  return artists.filter(a => (artistMusicCount[a.id] || 0) > 5);
}
