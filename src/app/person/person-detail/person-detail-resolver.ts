import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { PersonService } from '../../core/service/person.service';
import { Person } from '../../core/domain/person';

@Injectable()
export class PersonDetailResolver implements Resolve<Person> {

  constructor(private personService: PersonService,
              private router: Router,
              private route: ActivatedRoute) { }

  public resolve(route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot):
                 Observable<Person> {

    let personId: string = route.paramMap.get('personId');

    return this.personService.getPerson(personId)
                             .map((person: Person) => {
      return person;
    }).catch(err => {
      this.router.navigate(['/notFound'], { relativeTo: this.route });
      return Observable.of(null);
    });
  }
}
