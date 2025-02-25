import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class ApiJsonServerService {
  private apiUrl:string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getComment(id:number): Observable<Comments[]> {
    const params = new HttpParams() // query params
        .set('movieId', id);

        return this.http.get<Comments[]>(`${this.apiUrl}/reviews`, { params });
  }

  public sendComment(user: { movieId: number,         
    author: string,
    rating: number,
    img: string,
    reviewContent: string,
    reviewDate: string,
    watchedDate: string}): Observable<Comments> {
    return this.http.post<Comments>(`${this.apiUrl}/reviews`, {...user});
  }
}
