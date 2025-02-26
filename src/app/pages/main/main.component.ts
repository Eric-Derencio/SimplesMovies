import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MoviesService } from '../../services/movies.service';
import { LanguageService } from '../../services/language.service';
import { Fav, Movie, MovieSummary } from '../../models/filme';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-main',
  imports: [TranslatePipe, MovieCardComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
  currentPage: WritableSignal<number> = signal(1);
  selectedLanguage!: string;
  movieList!: Movie[];
  favList!: Fav[];
  filtered!: Fav[];
  topmovies: MovieSummary[] = [];
  cont: number=0;
  allMovies: MovieSummary[] = [];
  totalMovies: number = 0;

  constructor(
    private moviesService: MoviesService, 
    private languageService:LanguageService, 
    private favoriteService:FavoriteService, 
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.languageService.subjectObservable$.subscribe({
      next: ([lang, icon]) => {
        this.selectedLanguage = lang
        this.translate.use(this.selectedLanguage);
        this.fetchMoviePop(this.selectedLanguage,1);

      },
      error: (err) => console.error(err)
    });

    this.movieList = [];

  }


  fetchMovie(language: string,movieID: number) {
    this.moviesService.getMovieById(movieID, language).subscribe({
      next: (res) => {
        this.movieList = [...this.movieList, res];
      },
      error: (err) => console.error(err)
    });
  }
  
  fetchMoviePop(language: string,movieID: number) {
    console.log("entrou no fetchMoviePop")
    this.moviesService.getPopularMovies(language, this.currentPage()).subscribe({
      next: (res) => {
        console.log(res);
        this.topmovies = [...this.movieList, ...res.results];
        console.log(this.topmovies);
        this.allMovies = this.movieList;
        this.fetchFav()
        this.updateTotalMovies();
        
      },
      error: (err) => console.error(err)
    });
  }
  


  fetchFav(){
    this.movieList=[];
    this.favoriteService.getFav(1,this.selectedLanguage).subscribe({
      next: (res) => {
        this.favList=res;
        for(let i = 0; i < this.favList.length; i++) {
          this.fetchMovie(this.selectedLanguage, this.favList[i].movieId);
        }
        console.log(this.favList);
      },
      error: (err) => console.error(err)
    });
  }


  isfav(id:number):boolean{
    
    for(let i = 0; i < this.favList.length; i++) {
      if(this.favList[i].movieId===id){
        console.log("true");
        console.log(this.favList[i].movieId);
        console.log(id);
        return true;
      }
    }
    return false;
  }

  submitfav(movie:MovieSummary){
    const fav={movieId: movie.id, userId: 1}
    this.favoriteService.setFav(fav).subscribe({  
      next: (res) => {
        this.fetchFav();
      },
      error: (err) => console.error(err)
    });
  }

  
  delFav(id:number){
    
   this.filtered = this.favList.filter((fav) => fav.movieId == id);
   
    this.favoriteService.delFav(this.filtered[0].id).subscribe({
      next: (res) => {
        this.fetchFav();
      },
      error: (err) => console.error(err)
    });
  }

  private updateTotalMovies() {
    this.totalMovies = this.topmovies.length;
  }
}
