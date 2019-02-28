import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  private user: User;
  private authToken: any = null;

  //private endpoint = 'http://localhost:3000/contact-list/';
  private endpoint = 'api/contact-list/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  public getList(): Observable<any> {
    this.loadToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }

  public getContact(contact: Contact): Observable<any> {
    return this.http.get<any>(this.endpoint + 'edit/' + contact._id, this.httpOptions);
  }

  public addContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.endpoint + 'add', contact, this.httpOptions);
  }

  public editContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.endpoint + 'edit/' + contact._id, contact, this.httpOptions);
  }

  public deleteContact(contact: Contact): Observable<any> {
    return this.http.get<any>(this.endpoint + 'delete/' + contact._id, this.httpOptions);
  }

  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
