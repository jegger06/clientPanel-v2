import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Client } from './../models/Client';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
  private clientsCollection: AngularFirestoreCollection<Client>;
  private clientDocument: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private af: AngularFirestore) {
    this.clientsCollection = this.af.collection<Client>('clients');
  }

  getClients() {
    this.clients = this.clientsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDocument = this.af.doc<Client>(`clients/${id}`);
    this.client = this.clientDocument.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  }

  updateClient(client: Client) {
    this.clientDocument = this.af.doc(`clients/${client.id}`);
    this.clientDocument.update(client);
  }

  deleteClient(client: Client) {
    this.clientDocument = this.af.doc(`clients/${client.id}`);
    this.clientDocument.delete();
  }

}
