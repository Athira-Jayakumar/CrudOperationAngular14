import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    NgbModule ,
    ReactiveFormsModule,
    ToastModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
