import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { NPuzzleGenerator } from '@vendor/n-puzzle/NPuzzleGenerator';

@Component({
  selector: 'app-n-puzzle-game[size]',
  templateUrl: './n-puzzle-game.component.html',
  styleUrls: ['./n-puzzle-game.component.scss'],
})
export class NPuzzleGameComponent implements OnInit, OnChanges {
  @Input() size!: number;
  game?: number[];
  steps = 0;
  target?: string;
  solved = false;

  constructor(private readonly elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
    this.elementRef.nativeElement.style.setProperty('--rowNum', this.size);
  }

  reset(): void {
    this.steps = 0;
    this.solved = false;
    this.game = new NPuzzleGenerator(this.size).generate().instance;
    this.target = [...[...this.game].sort((a, b) => a - b).slice(1), 0].join(' ');
  }

  move(item: number): void {
    if (this.game) {
      const zero = this.game.indexOf(0);
      const index = this.game.indexOf(item);
      this.steps++;
      if (zero !== -1) {
        [this.game[zero], this.game[index]] = [
          this.game[index],
          this.game[zero],
        ];
        if (this.game.join(' ') === this.target) {
          this.solved = true;
        }
      }
    }
  }

  canMove(item: number): boolean {
    if (this.game && !this.solved) {
      const zero = this.game.indexOf(0);
      const index = this.game.indexOf(item);
      const dCol = Math.abs((index % this.size) - (zero % this.size));
      const dRow = Math.abs(
        Math.trunc(index / this.size) - Math.trunc(zero / this.size)
      );
      return (dCol === 1 && dRow === 0 ) || (dCol === 0 && dRow === 1);
    }
    return false;
  }
}
