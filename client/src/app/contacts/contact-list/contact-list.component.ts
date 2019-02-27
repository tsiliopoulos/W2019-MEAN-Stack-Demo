import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from 'src/app/services/auth.service';
import { ContactListService } from 'src/app/services/contact-list.service';

import { Contact } from 'src/app/models/contact';
import { Router } from '@angular/router';




@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactListService: ContactListService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.contacts = new Array<Contact>();

    this.displayContactList();
  }

  private displayContactList(): void {
    console.log("Is User logged in?: " + this.authService.LoggedIn());
    this.contactListService.getList().subscribe(data => {
      if (data.success) {
        this.contacts = data.contactList;
      } else {
        this.flashMessage.show('User must be logged-in', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

  private onDeleteClick(): void {
    if (!confirm('Are You Sure??')) {
      this.router.navigate(['/contact/contact-list']);
    }
  }

}
