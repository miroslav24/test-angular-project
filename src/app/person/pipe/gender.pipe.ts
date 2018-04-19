import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../../core/domain/gender';

@Pipe({
  name: 'displayGender',
  // impure pipe, update value when we change gender
  pure: false
})
export class GenderPipe implements PipeTransform {

  public transform(value: Gender): any {
    if (!value) {
      return;
    }
    return value.toLowerCase();
  }
}
