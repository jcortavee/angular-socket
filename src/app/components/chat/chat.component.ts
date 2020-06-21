import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatServiceService } from '../../services/chat-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public message: string;
  private subscription: Subscription;

  public messages: any[] = [];
  public divMessages: HTMLElement;

  constructor(
    private chatService: ChatServiceService
  ) { }

  ngOnInit() {
    this.divMessages = document.getElementById('chat-messages');

    this.subscription = this.chatService.getMessage()
      .subscribe(message => {
        this.messages.push(message);
        
        setTimeout(() => {
          this.divMessages.scrollTop = this.divMessages.scrollHeight;
        }, 50);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public send() {
    
    if (this.message.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage(this.message);
    this.message = "";
  }

}
