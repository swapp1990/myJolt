import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { CardComponent } from './card.component';
import { SearchBarComponent } from './search-bar.component';
import {StarWarsService} from "./services/starwars.service";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
