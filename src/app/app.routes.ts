import { Routes, RouterModule } from '@angular/router';
import {FavoritesComponent} from "./favorites.component";
import {MainComponent} from "./main.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'favs',
        component: FavoritesComponent
    }
];