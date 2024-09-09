import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-widget',
  templateUrl: './whatsapp-widget.component.html',
  styleUrls: ['./whatsapp-widget.component.css']
})
export class WhatsappWidgetComponent {
  @Input() phoneNumber: string = ''; // Número de teléfono
  message: string = ''; // Mensaje inicial vacío
  showChat: boolean = false; // Controla si el chat está visible o no


    // Alternar visibilidad del chat
    toggleChat() {
      this.showChat = !this.showChat;
    }

  // Abrir enlace de WhatsApp con el número y mensaje
  sendMessage() {
    const encodedMessage = encodeURIComponent(this.message);
    const whatsappURL = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank'); // Abre WhatsApp en una nueva pestaña
  }
}
