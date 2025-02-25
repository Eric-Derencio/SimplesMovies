import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fav, MovieSummary } from '../../models/filme';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  @Input() filme!: MovieSummary;
  @Input() isfav:boolean|undefined=false;
  @Output() add: EventEmitter<void>=new EventEmitter();
  @Output() del: EventEmitter<void>=new EventEmitter();
  favIcon: string='bi bi-heart me-3';
 
  

  constructor(private favoriteService: FavoriteService){}

  ngOnInit(){
    if(this.isfav ===true){
      this.favIcon='bi bi-heart-fill me-3';
    }
}

  changebutton() {

      if(this.isfav ===false){
        this.isfav=true;
        this.add.emit();
        this.favIcon='bi bi-heart-fill me-3';
      }else{
        this.isfav=false;
        this.del.emit();
        this.favIcon='bi bi-heart me-3';
      }
    }
}
