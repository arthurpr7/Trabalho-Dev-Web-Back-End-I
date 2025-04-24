import { MusicGenre } from "./musicGenre";

export interface Music {
	id: number;
	name: string;
	artistId: number;
	genre: MusicGenre;
	duration: number;
}