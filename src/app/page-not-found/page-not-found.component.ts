import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template: `
  <h5>{{headingTitle}}</h5>
  <button [routerLink]="['/']">Home</button>
  `,
  styles: ['h5 { font-size: 16px; }']
})
export class PageNotFoundComponent {

  private title: string;

  constructor() {
    this.title = 'Page not found';
  }

  public get headingTitle(): string {
    return this.title;
  }
}
