import { MusicGenre } from "./musicGenre";

// Representa uma música cadastrada no sistema.
export interface Music {
	id: number;
	name: string;
	artistId: number;
	genre: MusicGenre;
	duration: number;
}