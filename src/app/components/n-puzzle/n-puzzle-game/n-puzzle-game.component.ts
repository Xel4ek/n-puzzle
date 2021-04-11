import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { NPuzzleGenerator } from '@vendor/n-puzzle/NPuzzleGenerator';
import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';
@Component({
  selector: 'app-n-puzzle-game[size]',
  templateUrl: './n-puzzle-game.component.html',
  styleUrls: ['./n-puzzle-game.component.scss'],
})
export class NPuzzleGameComponent implements OnInit, OnChanges {
  @Input() size!: number;
  private puzzle?: NPuzzle;
  game?: number[];
  steps = 0;
  target?: string;
  solved = false;
  @Output() solveIt = new EventEmitter<NPuzzle>();
  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {}
  solveItPlz(): void {
    if (this.game && this.puzzle) {
      this.solveIt.emit({ ...this.puzzle, instance: [...this.game] });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
    this.elementRef.nativeElement.style.setProperty('--rowNum', this.size);
  }

  reset(): void {
    this.steps = 0;
    this.solved = false;
    this.puzzle = new NPuzzleGenerator(this.size).generate();
    this.game = [...this.puzzle.instance];
    this.target = [...[...this.game].sort((a, b) => a - b).slice(1), 0].join(
      ' '
    );
  }

  restore(): void {
    this.steps = 0;
    if (this.puzzle) {
      this.game = [...this.puzzle.instance];
    }
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
      return (dCol === 1 && dRow === 0) || (dCol === 0 && dRow === 1);
    }
    return false;
  }
}
