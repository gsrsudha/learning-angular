import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MessagesService } from './messages.service';

@Component({
  templateUrl: './messages.component.html',
  styles: [
    '.message-row { margin-bottom: 10px }'
  ]
})
export class MessagesComponent {
  get messages() {
    return this.messageService.messages;
  }

  constructor(private messageService: MessagesService,
              private router: Router) { }

  close(): void {
    // Close the popup.
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
}