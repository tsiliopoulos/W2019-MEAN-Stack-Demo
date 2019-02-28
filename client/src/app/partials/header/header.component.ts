import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogoutClick() {
    this.authService.logout().subscribe(data => {
      this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 5000});
      this.router.navigate(['/login']);
    });
    return false;
  }

  isLoggedIn(): boolean {
    return this.authService.LoggedIn();
  }

}
