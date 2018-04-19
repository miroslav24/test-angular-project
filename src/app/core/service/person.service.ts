import { Injectable, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Gender } from '../domain/gender';
import { Person } from '../domain/person';

@Injectable()
export class PersonService {

  private personsSource = new BehaviorSubject<Person[]>([]);
  public personsObservable = this.personsSource.asObservable();

  constructor(private http: HttpClient, private logger: Logger) {
  }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>("http://localhost:8080/backend/api/person-resource/persons")
      .map(stream => stream.map((res: any) => {
        return new Person(res.name, res.gender, res.id);
      })).share();
  }

  public deletePerson(personId: number): Observable<Person[]> {

    let observable = this.http.delete<Person[]>('http://localhost:8080/backend/api/person-resource/delete/' + personId)
      .map(stream => stream.map((res: any) => {
        return new Person(res.name, res.gender, res.id);
      })).share();

    observable.subscribe((persons: Person[]) => {
      this.personsSource.next(persons);
    });

    return observable;
  }

  public getPerson(personId: string): Observable<Person> {
    return this.http.get<Person>("http://localhost:8080/backend/api/person-resource/persons/" + personId)
      .map((res: any) => {
        return new Person(res.name, res.gender, res.id);
      });
  }

  public addPerson(person: Person): Observable<Person[]> {

    let observable = this.http.post<Person[]>("http://localhost:8080/backend/api/person-resource/add", person)
      .map(stream => stream.map((res: any) => {
        return new Person(res.name, res.gender, res.id);
      })).share();

    observable.subscribe((persons: Person[]) => {
      this.personsSource.next(persons);
    },
      err => this.logger.error(err)
    );

    return observable;
  }

  public updatePerson(person: Person): Observable<Person[]> {

    let observable = this.http.post<Person[]>("http://localhost:8080/backend/api/person-resource/update", person)
      .map(stream => stream.map((res: any) => {
        return new Person(res.name, res.gender, res.id);
      })).share();

    observable.subscribe((persons: Person[]) => {
      this.personsSource.next(persons);
    },
      err => this.logger.error(err)
    );

    return observable;
  }
}
