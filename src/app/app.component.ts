import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Custom Components
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie_seek-Angular-client';

  constructor(public dialog: MatDialog) { }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}
