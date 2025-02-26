import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';

import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { BreadcrumbComponent } from '../bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidenavComponent,
    LanguageSelectorComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
