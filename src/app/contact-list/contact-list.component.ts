import { Component } from '@angular/core';

interface Contact {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [
    { id: 1, name: 'John', email: 'john@example.com', contactNumber: '1234567890' },
    { id: 2, name: 'Jane', email: 'jane@example.com', contactNumber: '9876543210' }
  ];

  newContact: Contact = { id: 0, name: '', email: '', contactNumber: '' };

  addContact() {
    const newId = this.contacts.length + 1;
    this.newContact.id = newId;
    this.contacts.push({ ...this.newContact }); //add
    this.clearNewContact(); //clear
  }

  viewContact(contact: Contact) {
//New window
    const viewWindow = window.open('', '_blank');
    if (viewWindow) {
      viewWindow.document.write(`
        <h1>Contact Details</h1>
        <p>
          ID: ${contact.id} <br>
          Name: ${contact.name} <br>
          Email: ${contact.email} <br>
          Contact Number: ${contact.contactNumber} <br>
        </p>
      `);
      viewWindow.document.close();
    } else {
      alert('Please allow pop-ups in your browser to view contact details.!');
    }
  }


  updateContact(contact: Contact) {
    const updatedName = prompt('Enter the updated name:', contact.name);
    if (updatedName !== null) {
      const updatedEmail = prompt('Enter the updated email:', contact.email);
      if (updatedEmail !== null) {
        const updatedContactNumber = prompt('Enter the updated contact number:', contact.contactNumber);
        if (updatedContactNumber !== null) {
          contact.name = updatedName;
          contact.email = updatedEmail;
          contact.contactNumber = updatedContactNumber;
          console.log('Updated contact:', contact);
        }
      }
    }
  }


  deleteContact(contact: Contact) {
    const index = this.contacts.indexOf(contact);
    if (index > -1) {
      this.contacts.splice(index, 1);
      console.log('Deleted contact:', contact);
    }

    // Update the IDs of the remaining contacts
    this.updateContactIDs();
  }

  updateContactIDs() {
    this.contacts.forEach((contact, index) => {
      contact.id = index + 1;
    });
  }

  clearNewContact() {
    this.newContact = { id: 0, name: '', email: '', contactNumber: '' };
  }
}
