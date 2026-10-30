export interface Movie {
  title: string;
  link: string;
  image: string;
  provider?: string;
}

export interface MovieDetail {
  title?: string;
  synopsis?: string;
  image?: string;
  poster?: string;
  imdbId?: string;
  tmdbId?: string | number;
  type?: string;
  rating?: string | number;
  duration?: string;
  releaseDate?: string;
  cast?: string[];
  genre?: string[];
  linkList?: Array<{
    title: string;
    directLinks?: Array<{ title?: string; link: string; type?: string }>;
    episodesLink?: string;
    quality?: string;
    size?: string;
  }>;
  episodes?: Array<{
    title: string;
    episodeNumber?: number;
    seasonNumber?: number;
    link: string;
  }>;
}

export interface PlayTarget {
  title: string;
  tmdbId?: string | number;
  imdbId?: string;
  type: "movie" | "series";
  season?: number;
  episode?: number;
  directUrl?: string;
}

export interface ProviderInfo {
  name: string;
  value: string;
  type?: string;
  description?: string;
}
