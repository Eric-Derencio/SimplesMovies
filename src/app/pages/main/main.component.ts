import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MoviesService } from '../../services/movies.service';
import { LanguageService } from '../../services/language.service';
import { Fav, Movie } from '../../models/filme';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-main',
  imports: [TranslatePipe, MovieCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
  selectedLanguage!: string;
  movieList!: Movie[];
  favList!: Fav[];
  filtered!: Fav[];
  cont: number=0;

  constructor(private moviesService: MoviesService, private languageService:LanguageService, private favoriteService:FavoriteService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.languageService.subjectObservable$.subscribe({
      next: ([lang, icon]) => {
        this.selectedLanguage = lang
        this.translate.use(this.selectedLanguage);
        this.fetchFav();
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
  

  fetchFav(){
    console.log("entrou no main")
    this.favList = [];
    this.movieList=[];
    this.favoriteService.getFav(1,this.selectedLanguage).subscribe({
      next: (res) => {
        this.favList=res
        for(let i = 0; i < this.favList.length; i++) {
          this.fetchMovie(this.selectedLanguage, this.favList[i].movieId);
        }
      },
      error: (err) => console.error(err)
    });
  }

  //--------------------------------------------------------------------------------
  
  delFav(id:number){
   this.filtered = this.favList.filter((fav) => fav.movieId == id);
   
    this.favoriteService.delFav(this.filtered[0].id).subscribe({
      next: (res) => {
        this.fetchFav();
      },
      error: (err) => console.error(err)
    });
  }
}
