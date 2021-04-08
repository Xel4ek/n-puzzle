import { Component, OnInit } from '@angular/core';
import { DataHolderService } from '../../services/data-holder/data-holder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  loading$: Observable<boolean>;
  constructor(private readonly dataHolder: DataHolderService) {
    this.loading$ = dataHolder.isLoading;
  }

  ngOnInit(): void {
  }

}
