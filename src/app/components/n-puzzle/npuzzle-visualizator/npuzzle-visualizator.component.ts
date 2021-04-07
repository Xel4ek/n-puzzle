import { Component, OnInit } from '@angular/core';
import { NPuzzleGenerator } from '../../../../vendor/n-puzzle/NPuzzleGenerator';

@Component({
  selector: 'app-npuzzle-visualizator',
  templateUrl: './npuzzle-visualizator.component.html',
  styleUrls: ['./npuzzle-visualizator.component.scss'],
})
export class NPuzzleVisualizatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  visualize(): void {
    const pg5 = new NPuzzleGenerator(5);
    console.log(pg5);
    const pg4 = new NPuzzleGenerator(4);
    console.log(pg4);
    const pg3 = new NPuzzleGenerator(3);
    console.log(pg3);
  }
}
