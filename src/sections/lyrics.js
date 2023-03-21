import { getSongsDetails } from "../api";

const titleSection = document.querySelector("#lyrics-section h4");
const artistSection = document.querySelector("#lyrics-section h5");
const lyricsSection = document.querySelector("#lyrics-section p");

const renderLyricsSections = (id) => {
	getSongsDetails(id).then((song) => {
		console.log(song);
		titleSection.textContent = song.title;
		artistSection.textContent = song.artist.name;
		lyricsSection.textContent = song.lyrics;
	});
};

export default renderLyricsSections;
