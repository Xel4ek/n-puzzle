import { Component, OnInit } from '@angular/core';
import { NPuzzleGenerator } from '@vendor/n-puzzle/NPuzzleGenerator';

@Component({
  selector: 'app-n-puzzle-visualizer',
  templateUrl: './n-puzzle-visualizer.component.html',
  styleUrls: ['./n-puzzle-visualizer.component.scss'],
})
export class NPuzzleVisualizerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  visualize(): void {
    const pg5 = new NPuzzleGenerator(5, 'snake');
    console.log(pg5);
    const pg4 = new NPuzzleGenerator(4, 'snake');
    console.log(pg4);
    const pg3 = new NPuzzleGenerator(3, 'snake');
    console.log(pg3);
  }
}
