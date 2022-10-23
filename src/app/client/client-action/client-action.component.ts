import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetStartProcessComponent} from "./bottom-sheet-startprocess/bottom-sheet-start-process.component";

@Component({
  selector: 'app-client-action',
  templateUrl: './client-action.component.html',
  styleUrls: ['./client-action.component.scss']
})
export class ClientActionComponent implements OnInit, AfterViewInit {
  static client_task;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  getClientTask() {
    return ClientActionComponent.client_task;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetStartProcessComponent);
  }
}

