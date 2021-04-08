import { Component, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '../../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../../vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-total-information[results]',
  templateUrl: './total-information.component.html',
  styleUrls: ['./total-information.component.scss'],
})
export class TotalInformationComponent implements OnInit {
  solvableCount = 0;
  unsolvableCount = 0;
  totalRequiredSteps = 0;
  totalTime = 0;
  len = 0;

  @Input() set results(value: NPuzzleSolverReport<NPuzzle>[]) {
    this.newFunc(value);
  }

  constructor() {}

  newFunc(value: NPuzzleSolverReport<NPuzzle>[]): void {
    value.map((npuzzlereport) => {
      this.totalRequiredSteps += npuzzlereport.requiredSteps;
      this.solvableCount += npuzzlereport.solvable ? 1 : 0;
      this.totalTime += npuzzlereport.timeUsed;
    });
    this.len = value.length;
    this.unsolvableCount = this.len - this.solvableCount;
  }

  ngOnInit(): void {}
}
