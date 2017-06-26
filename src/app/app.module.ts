import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { CardComponent } from './card.component';
import { SearchBarComponent } from './search-bar.component';
import {StarWarsService} from "./services/starwars.service";

import {routes} from "./app.routes";
import {FavoritesComponent} from "./favorites.component";
import {MainComponent} from "./main.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CardComponent,
    SearchBarComponent,
    FavoritesComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
