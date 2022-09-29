import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control('',Validators.required),
      password: this.formBuilder.control('',Validators.required)
    });
  }

  onSubmit(loginCredentials) {
    this.clientService.processLogin(loginCredentials);
    // this.router.navigate(['/client']);
    this.clientService.refreshPage();
  }

  ngAfterViewInit(): void {
  }
}
