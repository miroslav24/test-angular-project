import { Gender } from "./gender";

export class Person {

  constructor(public name: string, public gender: Gender, public id?: number) { 
  }
}