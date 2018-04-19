import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../../core/service/person.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { Person } from '../../core/domain/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {

  public persons: Observable<Person[]>;
  private subscription: Subscription;

  constructor(private personService: PersonService) {
    this.subscription = this.personService.personsObservable.subscribe((persons: Person[]) => {
      this.persons = Observable.of(persons);
    });
  }

  public ngOnInit(): void {
    this.persons = this.personService.getPersons();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public deletePerson(person: Person) {
    this.personService.deletePerson(person.id);
  }
}
