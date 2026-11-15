import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
   contact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitForm() {
    const { name, email, subject, message } = this.contact;

    const body = `
Name: ${name}
Email: ${email}

Message:
${message}
    `;

    const mailto = `mailto:YOUR_EMAIL@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }
}
