import JsonStorage from "../lib/JsonStorage";
const favoriteStorage = new JsonStorage({ name: "favorites" });

const getFavorites = () => {
	return favoriteStorage.toArray().map((e) => e[1]);
};

const toggleFavorites = (song) => {
	if (favoriteStorage.getItem(song.id)) {
		favoriteStorage.removeItem(song.id);
	} else {
		favoriteStorage.setItem(song.id, song);
	}

	// FAIRE UNE PARTIE LOGIQUE POUR EVITER D'AVOIR DEUX FOIS LE MEME FAVORI
};

const isFavorite = (song) => {
	let bool = false;
	if (favoriteStorage.getItem(song.id)) {
		bool = true;
	}

	return bool;
};

export { getFavorites, toggleFavorites, isFavorite };

// FONCTIONNE MAIS NE PRENDS PAS EN COMPTE SI DEJA DANS LA LISTE OU NON
// const toggleFavorites = (song) => {
// 	favoriteStorage.addItem(song);
// };

// 	console.log(favoriteStorage.toArray().map((e) => e[1]));
