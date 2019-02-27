import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from 'src/app/services/validation.service';
import { ContactListService } from 'src/app/services/contact-list.service';

import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title: string;

  contact: Contact;

  constructor(
    private activatedRoute: ActivatedRoute,
    private validationService: ValidationService,
    private messageFlash: FlashMessagesService,
    private contactListService: ContactListService,
    private router: Router) {
    }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();

    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    if (this.title === 'Edit Contact') {
      this.displayContact(this.contact);
    }

  }

  displayContact(contact: Contact): void {
    this.contactListService.getContact(contact).subscribe(data => {
      this.contact = data.contact;
    });
  }

  onContactDetailsSubmit(): void {
    switch (this.title) {
      case 'Add Contact':
        this.contactListService.addContact(this.contact).subscribe(data => {
          if (data.success) {
            this.messageFlash.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/contact/contact-list']);
          } else {
            this.messageFlash.show('Add Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/contact/contact-list']);
          }
        });
        break;
      case 'Edit Contact':
        this.contactListService.editContact(this.contact).subscribe(data => {
          if (data.success) {
            this.messageFlash.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/contact/contact-list']);
          } else {
            this.messageFlash.show('Edit Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/contact/contact-list']);
          }
        });
        break;
    }
  }

}
