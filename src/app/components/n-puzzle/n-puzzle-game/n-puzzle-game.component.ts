import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NPuzzleGenerator } from '@vendor/n-puzzle/NPuzzleGenerator';
import { MappedNPuzzle, NPuzzle } from '@vendor/n-puzzle/NPuzzle';
import {
  ALGORITHMS_MAP,
  EXPLANATIONS_MAP,
} from '@components/n-puzzle/n-puzzle.component';
import { NPuzzlerService } from '@services/n-puzzler/npuzzler.service';
import { ModeService } from '@services/mode/mode.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-n-puzzle-game[size]',
  templateUrl: './n-puzzle-game.component.html',
  styleUrls: ['./n-puzzle-game.component.scss'],
})
export class NPuzzleGameComponent implements OnInit, OnChanges, OnDestroy {
  @Input() size!: number;
  puzzle?: NPuzzle;
  game?: number[];
  gamePuzzle?: NPuzzle;
  targetPuzzle?: MappedNPuzzle;
  steps = 0;
  target?: string;
  solved = false;
  algorithmsMap = Object.entries(ALGORITHMS_MAP);
  expansionsMap = Object.entries(EXPLANATIONS_MAP);
  private readonly subscription: Subscription;
  @Output() solveIt = new EventEmitter<NPuzzle>();
  private mode: 'regular' | 'snake' = 'snake';

  constructor(
    private readonly elementRef: ElementRef,
    private readonly nPuzzlerService: NPuzzlerService,
    private readonly modeService: ModeService
  ) {
    this.subscription = this.modeService
      .style()
      .pipe(
        map((style) => (this.mode = style.nPuzzleStyle ? 'snake' : 'regular'))
      )
      .subscribe();
  }

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
    this.puzzle = new NPuzzleGenerator(this.size, this.mode).generate();
    this.game = [...this.puzzle.instance];
    this.gamePuzzle = new NPuzzle(this.size, this.game);
    this.targetPuzzle = this.nPuzzlerService.target(this.gamePuzzle);

    this.target = this.targetPuzzle.instance.join(' ');
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

  ready(item: number, index: number): boolean {
    return this.targetPuzzle?.mapInstance.get(item)?.index === index;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
