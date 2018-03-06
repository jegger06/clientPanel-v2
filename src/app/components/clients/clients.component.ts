import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Array<Client>;
  totalOwed: number;

  constructor(public clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.totalOwed = this.getTotalOwed(clients.map(({balance}) => balance));
    });
  }

  getTotalOwed(balances) {
    return balances.reduce((a, b) => a + b);
  }

}
