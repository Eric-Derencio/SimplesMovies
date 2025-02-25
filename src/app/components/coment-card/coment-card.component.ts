import { Component, Input} from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-coment-card',
  imports: [AvatarComponent, DatePipe],
  templateUrl: './coment-card.component.html',
  styleUrl: './coment-card.component.scss'
})


export class ComentCardComponent {
 @Input() comment!:string;
 @Input() autor!:string;
 @Input() img!:string;
 @Input() dataReview!:string  
 @Input() rating!:number
}
