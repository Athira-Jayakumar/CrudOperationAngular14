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

  //baseApiUrl = 'https://localhost:7145/api/Contacts'

  //baseApiUrl : string = environment.baseApiUrl;
  
  constructor(private http : HttpClient, private modalService: NgbModal) { }

  GetContacts(): Observable<Contact[]>
  {
    return this.http.get<Contact[]>( 'https://localhost:7145/api/Contacts/get');
  }

  AddContact(contacts: Contact): Observable<addContactRequest>{
    
    return this.http.post<addContactRequest>('https://localhost:7145/api/Contacts/post',contacts);
  
  }
  EditContact(contact:Contact): Observable<updateContactRequest>{

    return this.http.put<updateContactRequest>( 'https://localhost:7145/api/Contacts/'+contact.id,contact);
  }
  DeleteContact(id:string):Observable<Contact>
  {
    return this.http.delete<Contact>('https://localhost:7145/api/Contacts/'+id);
  }
}


