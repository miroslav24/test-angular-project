import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Person } from '../../core/domain/person';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from 'angular2-logger/core';
import { Gender } from '../../core/domain/gender';
import { PersonService } from '../../core/service/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  private person: Person;

  public personForm: FormGroup;
  public updatingExisting: boolean = false;

  private subscription: Subscription;

  constructor(private router: Router, private logger: Logger, private fb: FormBuilder,
    private route: ActivatedRoute, private personService: PersonService) {
    this.createForm();
  }

  public ngOnInit() {
    this.subscription = this.route.data.subscribe((data: { person: Person }) => {
      if (data && data.person) {
        this.person = data.person;
        this.updatingExisting = true;
        this.ngOnChanges();
      }
    });
  }

  private createForm() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }

  public ngOnChanges() {
    if (this.updatingExisting) {
      this.personForm.reset({
        name: this.person.name,
        gender: this.person.gender
      });
    } else {
      this.personForm.reset({
        name: '',
        gender: null
      });
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get genders(): string[] {
    return Object.keys(Gender);
  }

  get name() { return this.personForm.get('name'); }

  get gender() { return this.personForm.get('gender'); }

  public savePerson() {
    let person: Person;
    if (this.updatingExisting) {
      person = new Person(this.personForm.value.name, this.personForm.value.gender, this.person.id);
      this.personService.updatePerson(person).subscribe((persons: Person[]) => {
        this.router.navigate(['/']);
      });
    } else {
      person = new Person(this.personForm.value.name, this.personForm.value.gender);
      this.personService.addPerson(person).subscribe((persons: Person[]) => {
        this.router.navigate(['/']);
      });
    }
  }
}
