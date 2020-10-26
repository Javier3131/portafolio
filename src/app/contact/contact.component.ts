import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  formHasError = false;
  errorMessage: string;
  sendingEmail = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const name: string = form.value.name;
    if (this.isEmptyOrSpaces(name)) {
      this.errorMessage = 'Name not valid!';
      this.formHasError = true;
      return;
    }
    const email: string = form.value.email;

    if (!email.includes('@')) {
      this.errorMessage = 'Email not valid!';
      this.formHasError = true;
      return;
    }

    const subject: string = form.value.subject;
    if (this.isEmptyOrSpaces(subject)) {
      this.errorMessage = 'Subject not valid!';
      this.formHasError = true;
      return;
    }

    const message = form.value.message;
    if (this.isEmptyOrSpaces(message)) {
      this.errorMessage = 'Message not valid!';
      this.formHasError = true;
      return;
    }

    const request = {
      name,
      subject,
      email,
      message,
    };
    const url =
    'https://us-central1-portafolio-54c88.cloudfunctions.net/email/email';
    this.sendingEmail = true;
    this.formHasError = false;
    this.http.post(url, request).subscribe((response) => {
      // this.sendingEmail = false;
      // console.log(response);
    });

    form.reset();
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
}
