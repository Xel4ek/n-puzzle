import { Component, } from '@angular/core';
import { DataHolderService } from '@services/data-holder/data-holder.service';
import { Observable } from 'rxjs';
import { AverageResults } from '@vendor/n-puzzle/puzzle.interfaces';

@Component({
  selector: 'app-total-information',
  templateUrl: './total-information.component.html',
  styleUrls: ['./total-information.component.scss'],
})
export class TotalInformationComponent {
  data$: Observable<AverageResults[]>;

  constructor(private readonly dataHolder: DataHolderService) {
    this.data$ = dataHolder.getAverageData();
  }
}
