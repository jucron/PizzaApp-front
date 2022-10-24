import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogStartProcessComponent} from "./dialog-startprocess/dialog-start-process.component";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.scss']
})
export class ClientActionComponent implements OnInit, AfterViewInit {
  client_task = this.clientService.getClientTask();

  constructor(public dialog: MatDialog,
              private clientService: ClientService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.clientService.updateClientTask();
    this.client_task = this.clientService.getClientTask();
    console.log('client_task is: '+this.client_task);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogStartProcessComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

