import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'messages',
        component: MessagesComponent,
        outlet: 'popup'
      }
    ])
  ],
  declarations: [MessagesComponent]
})
export class MessagesModule { }
