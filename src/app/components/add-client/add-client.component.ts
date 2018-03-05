import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }
  disableBalanceOnAdd: boolean = false;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit(f) {
    if (this.disableBalanceOnAdd) {
      f.value.balance = 0;
    }
    if (f.valid) {
      // Add new client
      this.clientService.newClient(f.value);
      this.flashMessagesService.show('New client added.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    } else {
      this.flashMessagesService.show('Please fill in all fields.', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['add-client']);
    }
  }

}