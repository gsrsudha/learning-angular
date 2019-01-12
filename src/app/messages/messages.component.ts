import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MessagesService } from './messages.service';

@Component({
  templateUrl: './message.component.html',
  styles: [
    '.message-row { margin-bottom: 10px }'
  ]
})
export class MessageComponent {
  get messages() {
    return this.messageService.messages;
  }

  constructor(private messageService: MessagesService,
              private router: Router) { }

  close(): void {
    // Close the popup.
  }
}