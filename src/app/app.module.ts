import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Logger, Level, Options } from 'angular2-logger/core';

import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonService } from './core/service/person.service';
import { HttpClientModule } from '@angular/common/http';
import { GenderPipe } from './person/pipe/gender.pipe';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';
import { PersonDetailResolver } from './person/person-detail/person-detail-resolver';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { PersonModule } from './person/person.module';

@NgModule({
  imports: [CoreModule, AppRoutingModule, PersonModule],
  declarations: [
    AppComponent, PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
