export type MovieSummary = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isfav?: boolean;
};

export type Movie = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: Collection | null;
  budget: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isfav?: boolean;
};

export type Collection = {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewMember = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  know_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
};

export type MovieCast = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export interface MovieApiResponse {
  page: number;
  results: MovieSummary[];
}
export type Fav = {
  id: number;
  movieId: number;
  userId: number;
};
