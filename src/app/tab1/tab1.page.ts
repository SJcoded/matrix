import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  hideCaret1 = false;
  hideCaret2 = true;
  constructor() {}

  onFirstAnimationFinished() {
    console.log('First animation finished');
    setTimeout(() => {
      this.hideCaret1 = true;
      this.hideCaret2 = false;
    }, 2000);
  }

  onSecondAnimationFinished() {
    console.log('Second animation finished');
  }
}
