import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() icon:string|undefined;
  @Input() text: string|null="Text";
  @Input() isBold: boolean=false;
}
