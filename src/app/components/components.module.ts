import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridAnimationComponent } from './grid-animation/grid-animation.component';
import { TypingAnimationComponent } from './typing-animation/typing-animation.component';

@NgModule({
  declarations: [GridAnimationComponent, TypingAnimationComponent],
  imports: [CommonModule],
  exports: [GridAnimationComponent, TypingAnimationComponent],
})
export class ComponentsModule {}
