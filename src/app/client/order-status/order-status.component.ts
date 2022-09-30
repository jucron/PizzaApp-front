import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService, Order} from "../client.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, AfterViewInit {
  order: Order;

  constructor(
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.assignOrder();
  }

  ngAfterViewInit(): void {
    this.assignOrder();
    this.updateOrder().then();
  }

  async updateOrder() {
    console.log('updateOrder accessed')
    let count = 1;
    let milliseconds = 20000;
    let sub = interval(milliseconds).subscribe(() => {
      console.log(milliseconds*count/1000+' seconds passed: Running \'updateOrder\' again with count='+count)
      count++;
      this.assignOrder();
      if (this.order.status=='finished') {
        sub.unsubscribe();
      }
    })
  }

  assignOrder () {
    this.clientService.getOrder()
      .subscribe((orderFetched: Order)=>{
        this.order = orderFetched;
      });
}

  onSubmit() { //todo: implement this in html
    this.clientService.changeClientTaskStatusAndRedirect('task_2', '/client/feedback');
  }
}
