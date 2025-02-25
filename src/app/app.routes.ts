import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MainComponent } from './pages/main/main.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

export const routes: Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[{
            path:'',
            component:MainComponent,
            data:{breadcrumb:'Inicio'},
        },{
            path:'movies',
            component:MoviesComponent,
            data:{breadcrumb:'Filmes'},
        },{
            path:'movie/:id',
            component:MovieDetailsComponent,
            data:{breadcrumb:'Detalhes do Filme'}
        }]
    }
];
