import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonDetailComponent } from './person/person-detail/person-detail.component';
import { PersonDetailResolver } from './person/person-detail/person-detail-resolver';

export const appRoutes: Routes = [
  { 
    path: '', component: PersonListComponent 
  },
  {
    path: 'detail', component: PersonDetailComponent
  },
  {
    path: 'detail/:personId', component: PersonDetailComponent, resolve: {
      person: PersonDetailResolver
    }
  },
  { 
    path: 'notFound', component: PageNotFoundComponent 
  },
  { 
    path: '**', redirectTo: 'notFound', pathMatch: 'full' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
