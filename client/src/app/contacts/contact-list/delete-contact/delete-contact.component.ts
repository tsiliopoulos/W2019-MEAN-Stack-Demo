import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from 'src/app/services/validation.service';
import { ContactListService } from 'src/app/services/contact-list.service';

import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {
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
    this.deleteContact(this.contact);
  }

  deleteContact(contact: Contact): void {
    this.contactListService.deleteContact(contact).subscribe(data => {
      if (data.success) {
        this.messageFlash.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/contact/contact-list']);
      } else {
        this.messageFlash.show('Delete Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/contact/contact-list']);
      }
    });
  }

}
