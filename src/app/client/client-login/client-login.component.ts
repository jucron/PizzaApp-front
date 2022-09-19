import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientLoginService} from "../client-login.service";

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientLoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: this.formBuilder.control('',Validators.required),
      password: this.formBuilder.control('')
    });
  }

  onSubmit(loginCredentials) {
    this.clientService.processLogin(loginCredentials);
  }
}

