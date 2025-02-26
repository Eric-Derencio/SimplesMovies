import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-bread-crumbs',
  imports: [RouterLink, CommonModule],
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Subscrição para capturar o término da navegação
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  private buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // Pega a rota atual
    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      // Verifica se há uma parte da URL
      let routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        // Monta a URL acumulada
        url += `/${routeURL}`;
        // Você pode tratar a label de forma dinâmica, aqui estou apenas capitalizando o primeiro caractere
        let label = routeURL.charAt(0).toUpperCase() + routeURL.slice(1);
        breadcrumbs.push({ label, url });
      }
      // Chama recursivamente para os filhos
      return this.buildBreadcrumb(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
