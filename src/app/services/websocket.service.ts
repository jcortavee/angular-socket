import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public status = true;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  emit(event: string, payload?: any, callback?: () => {}) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log("Conectado al servidor");
      this.status = true;
    });

    this.socket.on('disconnect', () => {
      console.log("No hay conexion");
      this.status = false;
    });
  }

}
