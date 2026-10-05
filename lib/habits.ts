// Official listening and streaming destinations, checked 5 October 2026.
// Catalogues and season availability can vary by region.
export const favouriteSong = {
  title: "Ullaallaa",
  film: "Petta",
  artist: "Anirudh Ravichander",
  spotify: "https://open.spotify.com/track/2LLZkWMReCWhgTrHuRh6dV",
  youtube: "https://www.youtube.com/watch?v=oLgzs8nut3A",
};

export const favouriteSeries = [
  { title: "Game of Thrones", theme: "Fantasy", platform: "JioHotstar", href: "https://www.hotstar.com/in/1971035002", art: "throne" },
  { title: "Stranger Things", theme: "Sci-fi", platform: "Netflix", href: "https://www.netflix.com/in/title/80057281", art: "portal" },
  { title: "FROM", theme: "Mystery", platform: "Prime Video", href: "https://www.primevideo.com/detail?gti=amzn1.dv.gti.a64f4664-8d15-41d6-b553-592247f39be6", art: "forest" },
] as const;

export const favouriteAnime = [
  { title: "One Piece", genre: "Adventure / Fantasy", platform: "Netflix", href: "https://www.netflix.com/in/title/80107103", art: "sail", tone: "sea" },
  { title: "Bleach", genre: "Action / Supernatural", platform: "Crunchyroll", href: "https://www.crunchyroll.com/series/G63VGG2NY/bleach", art: "blade", tone: "ember" },
  { title: "Naruto", genre: "Action / Adventure", platform: "Crunchyroll", href: "https://www.crunchyroll.com/series/GY9PJ5KWR/naruto", art: "spiral", tone: "sand" },
  { title: "Attack on Titan", genre: "Action / Dark fantasy", platform: "Crunchyroll", href: "https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan", art: "wings", tone: "sage" },
  { title: "Vinland Saga", genre: "Historical / Drama", platform: "Netflix", href: "https://www.netflix.com/in/title/81249833", art: "longboat", tone: "frost" },
  { title: "Black Clover", genre: "Action / Fantasy", platform: "Crunchyroll", href: "https://www.crunchyroll.com/series/GRE50KV36/black-clover", art: "clover", tone: "mint" },
] as const;

export const favouriteGames = ["Free Fire", "BGMI", "Chess"] as const;
export const favouriteSports = ["Kabaddi", "Football", "Cricket"] as const;
