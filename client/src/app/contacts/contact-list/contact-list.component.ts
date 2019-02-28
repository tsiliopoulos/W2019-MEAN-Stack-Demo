import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from 'src/app/services/auth.service';
import { ContactListService } from 'src/app/services/contact-list.service';

import { Contact } from 'src/app/models/contact';
import { Router } from '@angular/router';

import {NgbdSortableHeaderDirective, SortEvent} from '../../directives/sortable.directive';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
// tslint:disable-next-line: variable-name
  private _sortColumn: string;
// tslint:disable-next-line: variable-name
  private _sortDirection: string;

  contacts: Contact[] = [];
  page: number;
  pageSize: number;
  collectionSize: number;

  // column sorting and direction properties
  get sortColumn(): string {
    return this._sortColumn;
  }

  set sortColumn(newColumn: string) {
    this._sortColumn = newColumn;
  }

  get sortDirection(): string {
    return this._sortDirection;
  }

  set sortDirection(newDirection: string) {
    this._sortDirection = newDirection;
  }

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    private contactListService: ContactListService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.contacts = new Array<Contact>();
    this.page = 1;
    this.pageSize = 3;
    this.sortColumn = '';
    this.sortDirection = '';
    this.displayContactList();
  }

  private displayContactList(): void {
    this.contactListService.getList().subscribe(data => {
      if (data.success) {
        this.contacts = data.contactList;
        this.collectionSize = this.contacts.length;
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

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;

    this.contacts = this.sortContacts(this.contacts, this.sortColumn, this.sortDirection);
  }

  private compare(v1: string, v2: string): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sortContacts(contacts: Contact[], column: string, direction: string): Contact[] {
    if (direction === '') {
      return contacts;
    } else {
      return [...contacts].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
