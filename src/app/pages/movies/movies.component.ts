import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';

import { MoviesService } from '../../services/movies.service';
import { LanguageService } from '../../services/language.service';
import { Fav, Movie, MovieSummary } from '../../models/filme';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-movies',
  imports: [
    MovieCardComponent,
    CommonButtonComponent,
    CommonModule,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit, OnDestroy {
  currentPage: WritableSignal<number> = signal(1);
  totalMovies: number = 0;
  movieList: MovieSummary[] = [];
  allMovies!: MovieSummary[];
  searchQuery: string = '';
  selectedLanguage!: string;
  languageIcon!: string;
  favList!: Fav[];
  filtered!: Fav[];

  constructor(
    private moviesService: MoviesService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.languageService.subjectObservable$.subscribe({
      next: ([lang, icon]) => {
        this.selectedLanguage = lang;
        this.languageIcon = icon;
        this.translate.use(this.selectedLanguage);
        this.movieList = [];
        this.fetchMovies(this.selectedLanguage);
      },
      error: (err) => console.error(err),
    });
  }

  fetchMovies(language: string) {
    this.moviesService
      .getPopularMovies(language, this.currentPage())
      .subscribe({
        next: (res) => {
          this.movieList = [...this.movieList, ...res.results];
          this.allMovies = this.movieList;
          this.fetchFav();
          this.updateTotalMovies();
        },
        error: (err) => console.error(err),
      });
  }
  fetchFav() {
    this.favoriteService.getFav(1, this.selectedLanguage).subscribe({
      next: (res) => {
        this.favList = res;
      },
      error: (err) => console.error(err),
    });
  }

  isfav(id: number): boolean {
    for (let i = 0; i < this.favList.length; i++) {
      if (this.favList[i].movieId === id) {
        return true;
      }
    }
    return false;
  }

  loadMoreMovies() {
    this.currentPage.update((page) => page + 1);
    this.fetchMovies(this.selectedLanguage);
    console.log('Página atual:', this.currentPage());
  }

  filterMovieList() {
    if (this.searchQuery.trim()) {
      this.movieList = this.allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.movieList = [...this.allMovies];
    }

    this.updateTotalMovies();
  }

  private updateTotalMovies() {
    this.totalMovies = this.movieList.length;
  }

  submitfav(movie: MovieSummary) {
    console.log('entrou no submitfav');
    const fav = { movieId: movie.id, userId: 1 };
    this.favoriteService.setFav(fav).subscribe({
      error: (err) => console.error(err),
    });
  }

  delFav(movie: MovieSummary) {
    this.filtered = this.favList.filter((fav) => fav.movieId == movie.id);

    this.favoriteService.delFav(this.filtered[0].id).subscribe({
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    this.moviesService.destroyFilmes();
  }
}
