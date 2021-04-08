import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NPuzzleSolverReport } from '../../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../../vendor/n-puzzle/NPuzzle';
import { DataHolderService } from '../../../services/data-holder/data-holder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-information[results]',
  templateUrl: './total-information.component.html',
  styleUrls: ['./total-information.component.scss'],
})
export class TotalInformationComponent {
  data$: Observable<any>;
  @Input() results!: NPuzzleSolverReport<NPuzzle>[];

  constructor(private readonly dataHolder: DataHolderService) {
    this.data$ = dataHolder.getAverageData();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.newFunc();
  //   }

  // newFunc(): void {
  //   this.results.map((npuzzlereport) => {
  //     this.totalRequiredSteps += npuzzlereport.requiredSteps;
  //     this.solvableCount += npuzzlereport.solvable ? 1 : 0;
  //     this.totalTime += npuzzlereport.timeUsed;
  //   });
  //   this.unsolvableCount = this.results.length - this.solvableCount;
  // }

  ngOnInit(): void {}
}
