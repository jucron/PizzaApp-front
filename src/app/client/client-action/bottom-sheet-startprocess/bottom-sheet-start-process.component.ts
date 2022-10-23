import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-bottom-sheet-start-process',
  templateUrl: './bottom-sheet-start-process.component.html',
  styleUrls: ['./bottom-sheet-start-process.component.scss']
})
export class BottomSheetStartProcessComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetStartProcessComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
  }

}
