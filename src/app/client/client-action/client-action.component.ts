import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.scss']
})
export class ClientActionComponent implements OnInit, AfterViewInit {
  static client_task;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  getClientTask() {
    return ClientActionComponent.client_task;
  }
}
