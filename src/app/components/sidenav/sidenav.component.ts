import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from "../avatar/avatar.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, AvatarComponent,TranslatePipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  constructor(private route:Router){}

  isActive(){
    return this.route.url.includes("/movie");
  }
  
  }

