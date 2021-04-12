import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'n-puzzle';

  constructor(private readonly meta: Meta) {
    meta.addTags([
      {
        name: 'description',
        content:
          'Puzzle tag solver. 15 puzzle game. Artificial intelligence help in solving. School project 21 (42). The project was made using the Angular framework. All calculations are carried out in the browser. Completely Typescript project.',
      },
      { name: 'author', content: 'Xel4ek' },
      {
        name: 'keywords',
        content: '15 puzzle, n puzzle, algorithm, 21 school, A*',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]);
  }
}
