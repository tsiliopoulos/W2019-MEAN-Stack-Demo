import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationService } from 'src/app/services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private validationService: ValidationService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) {

    }

  ngOnInit() {
    this.user = new User();
  }

  onRegisterSubmit() {
    // validate fields
    if (!this.validationService.validateRegister(this.user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeOut: 3000});
      return false;
    }

    // validate email
    if (!this.validationService.validateEmail(this.user.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeOut: 3000});
      return false;
    }

    // register user
    this.authService.registerUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeOut: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('A registration error occurred', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
