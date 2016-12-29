import { Component, OnInit , trigger, state , transition , style , animate} from '@angular/core';
import {ClientService} from "../client.service";
import {Client} from "../client";
import {FirebaseListObservable} from "angularfire2";
import { animateFactory } from 'ng2-animate';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],

  animations: [
  trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 10 ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ])
]


})
export class ClientsComponent implements OnInit {



  clients:Client[]=[];
  constructor(private  clientSrv:ClientService) {

  }

  ngOnInit() {
    this.clientSrv.getClient().subscribe(clients => {
      this.clients = clients
    });
    console.log(this.clients);

  }


}
