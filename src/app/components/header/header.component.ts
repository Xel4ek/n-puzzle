import { Component, OnInit } from '@angular/core';
import { Mode, ModeService } from '@services/mode/mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly mode$: Observable<Mode>;
  constructor(private readonly modeService: ModeService) {
    this.mode$ = modeService.style();
  }
  ngOnInit(): void {}
  toggleNPuzzleType(): void {
    this.modeService.toggleNPuzzleType();
  }
  toggleSolveStyle(): void {
    this.modeService.toggleSolveStyle();
  }
}
