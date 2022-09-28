import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  orderForm: FormGroup;
  pizzaFlavors = [
    "Four cheese","Ham & Cheese","Tuna","Pepperoni","Veggie Pizza","Margherita","Hawaiian Pizza"];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      clientName: this.formBuilder.control('',Validators.required),
      pizzaFlavor: this.formBuilder.control('',Validators.required),
      address: this.formBuilder.control('',Validators.required),
      paid: this.formBuilder.control('')
    });
  }

  onSubmit(order) {
    this.clientService.createOrder(order);
    this.clientService.changeClientTaskStatus("task_1")
    this.routeThisPage()
  }

  ngAfterViewInit(): void {
    this.routeThisPage();
  }

  routeThisPage() {
    this.clientService.routeToCorrectPage("logged","task_0");
  }
}
