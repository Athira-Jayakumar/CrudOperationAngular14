import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactsService } from 'src/app/services/contacts.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { updateContactRequest } from 'src/app/models/UpdateContactRequest.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],

  providers: [MessageService]
})

export class ContactDetailsComponent implements OnInit {

  contact :Contact[]=[];
  contacts :Contact[] = [] ;
  editForm !: FormGroup ;
  closeResult!: string;
  httpClient: any;
  contentEdit:any;
  contentDelete: any;
  deleteId :any;
  updateId:any;
  updatecontactRequest!:updateContactRequest;

  
  edit = true;
  add = false;
  
  addContactRequest: Contact ={
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: 0
  }

  updateContactRequest:Contact ={
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: 0
  }
  
  //baseApiUrl : string = environment.baseApiUrl;
  baseApiUrl = 'https://localhost:7145/api/Contacts/'


  constructor(private contactservice : ContactsService , 
    private modalService: NgbModal, private fb: FormBuilder,
    private messageService :MessageService) {  
      
      this.editForm = this.fb.group({
        id: [''],
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
       phonenumber: ['',[Validators.required]]
      });
  }
  get getControl(){
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.getContactDetails();
   
  }
    getContactDetails(){
    this.contactservice.GetContacts().subscribe({
      next:(contacts) => {
       this.contacts = contacts;
       console.log(contacts)
      },
      error : (response) => {
        console.log(response);
      }
    });
  }
  

   AddContact(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }
   
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
SaveContact()
{
  // const data ={                                                                                                       
  //   firstName : this.addContactRequest.firstName,
  //   lastName : this.addContactRequest.lastName,
  //   email : this.addContactRequest.email,
  //   phonenumber : this.addContactRequest.phonenumber
 
  this.contactservice.AddContact(this.addContactRequest).subscribe(response => {
    console.log(response)
    this.getContactDetails();
    
  });
  this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully saved!'});
}

EditContact(targetModal: any, contacts:Contact)
{
  this.modalService.open(targetModal, {
    centered:true,
    backdrop:'static',
    size :'lg'
  });
  this.editForm.patchValue({
    id:contacts.id,
    firstName:contacts.firstName,
    lastName:contacts.lastName,
    email:contacts.email,
    phonenumber:contacts.phonenumber
  });
}
// resetValues(){
//   this.updateContactRequest.firstName="";
//   this.updateContactRequest.lastName="";
//   this.updateContactRequest.email="";
//   this.updateContactRequest.phonenumber=0;
//   this.edit = true;
//   this.add = false;
// }

UpdateContact()
{
    this.updateContactRequest={

    id:this.editForm.value.id,
    firstName:this.editForm.value.firstName,
    lastName:this.editForm.value.lastName,
    email:this.editForm.value.email,
    phonenumber:this.editForm.value.phonenumber
  }
   this.contactservice.EditContact(this.updateContactRequest).subscribe(response => {
    console.log(response);
    this.getContactDetails();
   });
  //   this.resetValues();
  //this.contacts.push(this.updatecontactRequest);
  //this.resetValues();
  
}
DeleteContact(targetModal : any,contact:Contact) {
  this.deleteId = contact.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}
OnDelete(id:string){
  
    this.contactservice.DeleteContact(id)
     .subscribe(response => {
      this.getContactDetails()

     }
     ); 
  
}
}
