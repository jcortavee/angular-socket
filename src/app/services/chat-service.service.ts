import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(
    private webSocketService: WebsocketService
  ) { }

  sendMessage(message: string) {
    const payload = {
      name: 'Jose Carlos',
      body: message
    };

    this.webSocketService.emit('message', payload);
  }

  getMessage() {
    return this.webSocketService.listen('message-new');
  }

}
