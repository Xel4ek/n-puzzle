import { Component, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '@vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-n-puzzle-result[result][index]',
  templateUrl: './n-puzzle-result.component.html',
  styleUrls: ['./n-puzzle-result.component.scss']
})
export class NPuzzleResultComponent implements OnInit {
  @Input() result!: NPuzzleSolverReport<NPuzzle>;
  @Input() index!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
