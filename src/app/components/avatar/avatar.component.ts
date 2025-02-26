import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() description: string = '';
  @Input() name: string = '';
  @Input() image: string =
    'https://lh5.googleusercontent.com/-ScnXlu8ypiI/AAAAAAAAAAI/AAAAAAAAACE/UizJ7lvhvlE/photo.jpg';
}
