import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NPuzzleSolverReport } from '../../../../vendor/n-puzzle/NPuzzleSolver';
import { NPuzzle } from '../../../../vendor/n-puzzle/NPuzzle';
import { DataHolderService } from '../../../services/data-holder/data-holder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-information',
  templateUrl: './total-information.component.html',
  styleUrls: ['./total-information.component.scss'],
})
export class TotalInformationComponent {
  data$: Observable<any>;
  constructor(private readonly dataHolder: DataHolderService) {
    this.data$ = dataHolder.getAverageData();
  }

}
