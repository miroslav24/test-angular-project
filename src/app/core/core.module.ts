import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Logger, Options } from 'angular2-logger/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonService } from './service/person.service';

@NgModule({
  imports: [BrowserModule, CommonModule,
            ReactiveFormsModule, HttpClientModule],
  providers: [Logger, Options, PersonService],
  exports: [BrowserModule, CommonModule,
            ReactiveFormsModule, HttpClientModule]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf()
              parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded'+
        'Import it in the AppModule only');
    }
  }
}
