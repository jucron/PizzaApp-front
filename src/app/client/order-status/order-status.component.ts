import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService} from "../client.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterViewInit {
  order = ClientService.order;

  constructor(
    private clientService: ClientService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.order = ClientService.order;
    this.updateOrder().then();
  }
  async updateOrder() {
    console.log('updateOrder accessed')
    let sub = interval(10000).subscribe(() => {
      this.clientService.getOrder();
      this.order = ClientService.order;
      if (this.order.status=='finished') {
        sub.unsubscribe();
      }
    })

  }
}
