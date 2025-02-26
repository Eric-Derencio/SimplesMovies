import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MoviesService } from '../../services/movies.service';
import { LanguageService } from '../../services/language.service';
import { ApiJsonServerService } from '../../services/api-json-server.service';
import { CastMember, CrewMember, Movie } from '../../models/filme';
import { Comments } from '../../models/comments';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ComentCardComponent } from '../../components/coment-card/coment-card.component';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';

@Component({
  selector: 'app-movie-details',
  imports: [
    AvatarComponent,
    CommonButtonComponent,
    BadgeComponent,
    DatePipe,
    ComentCardComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  cast!: CastMember[];
  resumeCast!: CastMember[];
  director!: CrewMember[];
  comments!: Comments[];
  private actorsToShow = 4;
  language!: string;
  iconLanguage!: string;
  meuFormulario: FormGroup;
  comentModel!: string;
  notaModel!: number;
  dataModel!: string;

  constructor(
    private moviesServices: MoviesService,
    private route: ActivatedRoute,
    private languageServices: LanguageService,
    private apiJasonServer: ApiJsonServerService,
    private translate: TranslateService
  ) {
    this.meuFormulario = new FormGroup({
      comentario: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
      ]),
      nota: new FormControl('', [
        Validators.min(0),
        Validators.max(10),
        Validators.required,
      ]),
      data: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const movieID = Number(this.route.snapshot.paramMap.get('id'));

    this.languageServices.subjectObservable$.subscribe({
      next: (valor) => {
        this.language = valor[0];
        this.iconLanguage = valor[1];
        this.translate.use(this.language);
        this.fetchMovieDetails(movieID);
      },
      error: (err) => console.error(err),
    });

    this.fetchMovieDetails(movieID);
    this.fetchComments(movieID);
  }

  private fetchMovieDetails(movieID: number): void {
    this.fetchMovieDescription(movieID);
    this.fetchMovieCredits(movieID);
  }

  private fetchMovieDescription(movieID: number): void {
    this.moviesServices.getMovieById(movieID, this.language).subscribe({
      next: (res) => (this.movie = res),
      error: (err) => console.error(err),
    });
  }

  private fetchMovieCredits(movieID: number): void {
    this.moviesServices.getMovieCredits(movieID, this.language).subscribe({
      next: (res) => {
        this.cast = res.cast;
        this.director = res.crew.filter((member) => member.job === 'Director');
        this.resumeCast = this.cast.slice(0, this.actorsToShow);
      },
      error: (err) => console.error(err),
    });
  }

  private fetchComments(movieID: number): void {
    this.apiJasonServer.getComment(movieID).subscribe({
      next: (values) => (this.comments = values),
      error: (err) => console.error('Erro ao buscar comentários:', err),
    });
  }

  loadMoreActors(): void {
    const currentLength = this.resumeCast.length;
    const nextActors = this.cast.slice(
      currentLength,
      currentLength + this.actorsToShow
    );
    this.resumeCast = [...this.resumeCast, ...nextActors];
  }

  submitComment(): void {
    const newComment: Comments = {
      movieId: this.movie.id,
      author: 'Nome Usuario',
      rating: this.notaModel,
      img: 'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2024/07/08/705457866-chaves-exposicao.jpg',
      reviewContent: this.comentModel,
      reviewDate: new Date().toISOString().split('T')[0],
      watchedDate: this.dataModel,
    };

    if (this.meuFormulario.valid && this.movie.release_date < this.dataModel) {
      this.apiJasonServer.sendComment(newComment).subscribe({
        next: () => {
          alert('Comentário enviado com sucesso!'),
            this.fetchComments(this.movie.id);
        },
        error: (err) => console.error('Erro ao enviar comentário:', err),
      });
    } else {
      alert('Preencha todos os campos');
    }
  }
}
