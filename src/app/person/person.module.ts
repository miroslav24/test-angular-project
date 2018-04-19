import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Logger, Options } from 'angular2-logger/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { GenderPipe } from './pipe/gender.pipe';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailResolver } from './person-detail/person-detail-resolver';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [BrowserModule, CommonModule, ReactiveFormsModule, RouterModule],
    providers: [PersonDetailResolver],
    declarations: [PersonListComponent, GenderPipe, PersonDetailComponent]
})

export class PersonModule {
}