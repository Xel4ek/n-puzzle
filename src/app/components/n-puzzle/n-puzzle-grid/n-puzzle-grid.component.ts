import { Component, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '@vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-n-puzzle-grid',
  templateUrl: './n-puzzle-grid.component.html',
  styleUrls: ['./n-puzzle-grid.component.scss'],
})
export class NPuzzleGridComponent implements OnInit {
  @Input() result!: NPuzzleSolverReport<NPuzzle>;
  size = 0;

  constructor() {}

  ngOnInit(): void {
    this.size = this.result.sourceInstance.size;
  }

  applyStyles(): object {
    const styles = {
      'grid-template-columns': `repeat(${this.size}, 1fr)`,
      'grid-template-rows': `repeat(${this.size}, 1fr)`,
    };
    return styles;
  }
}
