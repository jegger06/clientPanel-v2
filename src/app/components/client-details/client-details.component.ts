import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  disableBalanceOnEdit: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      this.disableBalanceOnEdit = !this.settingsService.getSettings().disableBalanceOnEdit;
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessagesService.show('Balance Updated!', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate([`/client/${this.id}`]);
  }

  onDeleteClick() {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessagesService.show('Client Deleted!', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }
}
