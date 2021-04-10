import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { NPuzzleSolverReport } from '@vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '@vendor/n-puzzle/NPuzzle';

@Component({
  selector: 'app-n-puzzle-grid',
  templateUrl: './n-puzzle-grid.component.html',
  styleUrls: ['./n-puzzle-grid.component.scss'],
})
export class NPuzzleGridComponent implements OnInit, AfterViewInit{
  @Input() result!: NPuzzleSolverReport<NPuzzle>;
  size = 0;

  constructor(private readonly elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.size = this.result.sourceInstance.size;
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.setProperty('--rowNum', this.result.sourceInstance.size);
  }
}
