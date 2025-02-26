import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss',
})
export class CommonButtonComponent {
  @Input() text: string;
  @Input() icon: string;

  constructor() {
    this.text = 'Standard Text';
    this.icon = '';
  }
}
