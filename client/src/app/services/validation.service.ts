import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  validateRegister(user: User) {
    if (
      user.username === undefined ||
      user.password === undefined ||
      user.email === undefined ||
      user.displayName === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
  // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
