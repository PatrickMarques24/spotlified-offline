import { getSongsForArtist, searchSongs } from "../api";
import playSong from "./player";
import { getFavorites, toggleFavorites, isFavorite } from "./favorite";

// On obtient l'élément DOM qui nous servira de template pour un élément de la list
const songListItemTemplate = document.querySelector("#list-item-template");

// Element DOM de la liste à manipuler
const songList = document.querySelector(".list");

// Génère le HTML nécessaire pour afficher une liste de chansons, basé sur le tableau passé en paramètre
const renderSongs = (songs) => {
	// On vide la liste de ses anciennes informations, pour en ajouter de nouvelles à jour
	songList.replaceChildren();

	// On itère sur chacune des chansons récupérées depuis l'API pour cet artiste
	songs.forEach((song) => {
		// Créer une copie du template et de son contenu pour avoir un nouvelle élément vierge
		// que l'on stock dans la variable newSongItem
		const newSongItem = songListItemTemplate.content.cloneNode(true);

		// On rempli le titre de la chanson dans ce nouvel élément, en sélectionnant l'élément
		// list-item-title à l'intérieur (!dans newSongItem! Pas dans document)
		newSongItem.querySelector(".list-item-title").innerHTML = song.title;

		newSongItem.querySelector("a").href = `#songs-${song.id}`;

		// Au clique sur le bouton play, on transmet la chanson et le tableau duquel elle provient au player. Cela permet de
		// lire la chanson et passer le contexte actuel au player (le tableau) pour faire précédent/suivant
		newSongItem.querySelector(".play-button").addEventListener("click", () => {
			playSong(song, songs);
			window.location.hash = "#player";
		});

		// AJOUT EN FAVORIS
		newSongItem.querySelector(".add-button").addEventListener("click", () => {
			toggleFavorites(song);
			renderSongs(songs);
			if (window.location.hash == "#favorites") {
				renderSongs(getFavorites());
			}
		});

		// VERIFICATION PAS OUBLIER DE METTRE AUSSI DANS LES IMPORTS
		let verification = isFavorite(song);

		if (verification == true) {
			newSongItem.querySelector(".add-button span").textContent = "favorite";
		} else {
			newSongItem.querySelector(".add-button span").textContent =
				"favorite_border";
		}

		// On l'ajoute à la liste de chansons
		songList.append(newSongItem);
	});
};

// Génère le HTML nécessaire pour afficher la liste de chanson d'un artiste, basé sur son id
const renderSongsForArtistSection = async (artistId) => {
	// On récupère les songs d'un artiste depuis l'API, en se servant de son Id passé en paramètre
	const songs = await getSongsForArtist(artistId);

	// Set le nom de l'artiste
	document.querySelector(
		"#list-section h4"
	).textContent = `Artistes > ${songs[0].artist.name}`;

	// Affiche les chansons
	renderSongs(songs);
};

// Génère le HTML nécessaire pour afficher la liste de chanson d'un artiste, basé sur son id
const renderSongsForSearchSection = async (query) => {
	// On récupère les songs correspondant à la recherche depuis l'API, en se servant de la query passée en paramètre
	const songs = await searchSongs(query);

	// Set le nom de l'artiste
	document.querySelector(
		"#list-section h4"
	).textContent = `Résultats pour "${query}"`;

	// Affiche les chansons
	renderSongs(songs);
};

// Génère le HTML nécessaire pour afficher la liste de chanson d'un artiste, basé sur son id
const renderFavoriteSection = async () => {
	// On récupère les songs correspondant à la recherche depuis l'API, en se servant de la query passée en paramètre
	const songs = getFavorites();

	// Set le nom de l'artiste
	document.querySelector("#list-section h4").textContent = `Vos favoris`;

	// Affiche les chansons
	renderSongs(songs);
};

export {
	renderSongsForArtistSection,
	renderSongsForSearchSection,
	renderFavoriteSection,
};
