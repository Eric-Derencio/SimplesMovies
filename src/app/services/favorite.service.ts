import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fav } from '../models/filme';
import { Language } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private jsonUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  public getFav(id: number, language: Language): Observable<Fav[]> {
    const params = new HttpParams() // query params
      .set('userId', id)
      .set('language', language);

    return this.http.get<Fav[]>(`${this.jsonUrl}/favMovies`, { params });
  }

  public setFav(fav: { movieId: number; userId: number }): Observable<Fav> {
    return this.http.post<Fav>(`${this.jsonUrl}/favMovies`, { ...fav });
  }

  public delFav(id: string | number): Observable<unknown> {
    if (typeof id === 'number') {
      id = String(id);
    }
    return this.http.delete<Fav>(`${this.jsonUrl}/favMovies/${id}`);
  }
}
