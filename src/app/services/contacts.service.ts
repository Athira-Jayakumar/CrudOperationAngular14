import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addContactRequest } from '../models/AddContactRequest.model';
import { Contact } from '../models/contact.model';
import { updateContactRequest } from '../models/UpdateContactRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {


  baseApiUrl : string = environment.baseApiUrl;
  
  constructor(private http : HttpClient, private modalService: NgbModal) { }

  GetContacts(): Observable<Contact[]>
  {
    return this.http.get<Contact[]>(this.baseApiUrl + '/api/Contacts/get');
  }

  AddContact(contacts: Contact): Observable<addContactRequest>{
    
    return this.http.post<addContactRequest>(this.baseApiUrl + '/api/Contacts/post',contacts);
  
  }
  EditContact(contacts:Contact): Observable<updateContactRequest>{

    return this.http.put<updateContactRequest>(this.baseApiUrl + '/api/Contacts/{id}',contacts);
  }
  DeleteContact(id : string):Observable<Contact[]>
  {
    return this.http.delete<Contact[]>(this.baseApiUrl + 'api/Contacts/{id}');
  }
}


