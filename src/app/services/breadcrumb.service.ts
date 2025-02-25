import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumbs';


@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.router.routerState.snapshot.root);
        this.breadcrumbs$.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.routeConfig && route.routeConfig.data) {
      const path = route.routeConfig.path || '';
      url += `/${path.replace(':id', route.params['id'] || '')}`;
      breadcrumbs.push({ label: route.routeConfig.data['breadcrumb'], url });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
