import { Component, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '../../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../../vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-npuzzle-result[result][index]',
  templateUrl: './npuzzle-result.component.html',
  styleUrls: ['./npuzzle-result.component.scss']
})
export class NPuzzleResultComponent implements OnInit {
  @Input() result!: NPuzzleSolverReport<NPuzzle>;
  @Input() index!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
