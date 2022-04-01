import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-grid-animation',
  templateUrl: './grid-animation.component.html',
  styleUrls: ['./grid-animation.component.scss'],
})
export class GridAnimationComponent implements AfterViewInit {
  @ViewChild('grid', { static: false }) grid: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    let rowCount = 1;
    let colCount = 1;
    const grid = this.grid.nativeElement;

    // FILL GRID
    for (let index = 0; index <= 100; index++) {
      // NEW CELL
      const newCell = this.renderer.createElement('div');
      newCell.classList.add('grid-cell');

      // SHIFT DOWN IF ROW IS FULL
      if (colCount === 11) {
        colCount = 1;
        rowCount++;
      }

      // SHIFT HORIZONTALLY EACH NEW CELL
      newCell.style.gridColumn = colCount + ' / ' + colCount;
      newCell.style.gridRow = rowCount + ' / ' + rowCount;
      this.renderer.appendChild(grid, newCell);

      colCount++;
    }

    // ANIMATE GRID
    const gridTimeline = anime.timeline({});

    gridTimeline
      .add({
        targets: '.grid .grid-cell',
        backgroundColor: ['#161716', '#00da30'],
        easing: 'easeInOutQuad',
        duration: (el, i, l) => anime.random(500, 1000),
        scale: [
          { value: 0.1, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 },
        ],
        delay: anime.stagger(100, { grid: [14, 5], from: 'center' }),
      })
      .add({
        targets: '.grid .grid-cell',
        translateX: anime.stagger(10, {
          grid: [10, 10],
          from: 'center',
          axis: 'x',
        }),
        translateY: anime.stagger(10, {
          grid: [10, 10],
          from: 'center',
          axis: 'y',
        }),
        rotateZ: anime.stagger([0, 90], {
          grid: [10, 10],
          from: 'center',
          axis: 'x',
        }),
        delay: anime.stagger(100, { grid: [10, 1], from: 'center' }),
        duration: 1000,
      })
      .add({
        targets: '.grid .grid-cell',
        opacity: anime.stagger(0, { grid: [10, 10], from: 'center' }),
        delay: anime.stagger(100, { grid: [10, 1], from: 'center' }),
        duration: 1000,
      });
  }
}
