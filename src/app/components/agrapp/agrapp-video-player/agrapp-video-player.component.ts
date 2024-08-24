import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agrapp-video-player',
  templateUrl: './agrapp-video-player.component.html',
  styleUrls: ['./agrapp-video-player.component.css']
})
export class AgrappVideoPlayerComponent implements OnInit {
  @Input() videoUrls: string[] = [];
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  currentVideoIndex = 0;

  ngOnInit() {
    // Se inicializa la carga del primer video en ngOnInit
    this.loadVideo();
  }

  loadVideo() {
    if (this.videoUrls.length > 0) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.src = this.videoUrls[this.currentVideoIndex];
      
      // Escuchar el evento de metadata cargada antes de reproducir el video
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch(error => console.error('Error playing video:', error));
      });

      // Asegurarse de limpiar los eventos si se carga un nuevo video
      videoElement.removeEventListener('loadedmetadata', () => {});
      videoElement.load();
    }
  }

  onVideoEnded() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoUrls.length;
    this.loadVideo();
  }

  togglePictureInPicture() {
    const videoElement = this.videoPlayer.nativeElement;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(error => console.error('Error exiting Picture-in-Picture mode:', error));
    } else {
      if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) {
        videoElement.requestPictureInPicture().catch(error => console.error('Error entering Picture-in-Picture mode:', error));
      } else {
        console.error('Video metadata not loaded yet.');
      }
    }
  }
}
