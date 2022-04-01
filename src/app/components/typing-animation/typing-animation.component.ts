import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-typing-animation',
  templateUrl: './typing-animation.component.html',
  styleUrls: ['./typing-animation.component.scss'],
})
export class TypingAnimationComponent implements AfterViewInit {
  @Input() text = '';
  @Input() hideCaret = false;
  @ViewChild('caret', { static: false }) caret: ElementRef;
  @ViewChild('p', { static: false }) p: ElementRef;

  @Output() typingAnimationFinished = new EventEmitter();

  constructor(private renderer: Renderer2) {}

  // ngOnChanges() {
  //   const caret = this.caret.nativeElement;

  //   // BLINKING CARET ANIMATION
  //   const idleCaretAnimation = anime.timeline({
  //     targets: caret,
  //     loop: true,
  //     direction: 'alternate',
  //   });

  //   idleCaretAnimation.add({
  //     opacity: [1, 0],
  //     easing: 'easeInOutQuad',
  //     duration: 600,
  //   });

  //   idleCaretAnimation.play();
  // }

  ngAfterViewInit() {
    const caret = this.caret.nativeElement;
    const p = this.p.nativeElement;
    const text = this.text;
    const characterArray = text.split('');
    let currentLength = 0;

    anime({
      targets: p,
      easing: 'easeOutExpo',
      duration: 2000,
      update: (anim) => {
        // Add text character when progress increases
        if (
          currentLength <
          Math.floor((characterArray.length * anim.progress) / 100)
        ) {
          this.text = characterArray.slice(0, currentLength + 1).join('');
          currentLength++;

          // Stop caret from blinking
          idleCaretAnimation.pause();
        }
        if (anim.progress === 100) {
          idleCaretAnimation.play();
          this.typingAnimationFinished.emit();
        }
      },
    });

    // BLINKING CARET ANIMATION
    const idleCaretAnimation = anime.timeline({
      targets: caret,
      loop: true,
      direction: 'alternate',
    });

    idleCaretAnimation.add({
      opacity: [1, 0],
      easing: 'easeInOutQuad',
      duration: 600,
    });
  }
}
