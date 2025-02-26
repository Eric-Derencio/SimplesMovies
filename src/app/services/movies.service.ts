import { Injectable } from '@angular/core';
import { MovieSummary, MovieApiResponse, Movie, CastMember, MovieCast, Fav } from '../models/filme';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
//teste mudança

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://api.themoviedb.org/3/movie';

  private defaultHeaders = {
    Authorization: 'Bearer ' + environment.apiKey,
  };


  private listaRetorno: MovieSummary[] = [];
  private exibicaoAtual: number = 0;
  private numAtual: number = 0;

  constructor(private http: HttpClient) { }

  public getPopularMovies(language: string, page: number): Observable<MovieApiResponse> {
    // tipar o retorno

    const params = new HttpParams() // query params
    .set('language', language)
    .set('page', page);

    return this.http.get <MovieApiResponse>(`${this.apiUrl}/popular`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  public getTopRatedMovie(language: string, page: number): Observable<MovieApiResponse> {
    // tipar o retorno

    const params = new HttpParams() // query params
    .set('language', language)
    .set('page', page);

    return this.http.get <MovieApiResponse>(`${this.apiUrl}/top_rated`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  public getMovieById(id:number, language:string): Observable<Movie>{
    const params = new HttpParams() // query params
    .set('language', language)
    .set('id', id);

    return this.http.get<Movie>(`${this.apiUrl}/`+id,{
      params: params,
      headers: this.defaultHeaders,
    })
  }
  
  public getMovieCredits(id:number, language:string): Observable<MovieCast>{
    const params = new HttpParams() // query params
    .set('language', language)
    .set('id', id);

    return this.http.get<MovieCast>(`${this.apiUrl}/`+id+`/credits`,{
      params: params,
      headers: this.defaultHeaders,
    })
  }

  
      

  destroyFilmes(): void {
    this.listaRetorno.length = 0;
    this.exibicaoAtual = 0;
    this.numAtual = 0;
  }
}
