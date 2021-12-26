import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';

interface Message {
  message: string;
}

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  callApi(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/messages/public-message`)
      // @ts-ignore
      .subscribe((result: Message) => {
        this.message = result.message;
      });
  }

  callSecureApi(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/messages/protected-message`)
      // @ts-ignore
      .subscribe((result: Message) => {
        this.message = result.message;
      });
  }
}
