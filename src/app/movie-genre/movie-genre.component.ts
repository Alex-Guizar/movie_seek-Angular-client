/**
 * Displays information about the selected movie's genre.
 * @module
 */
import { Component, Inject, OnInit } from '@angular/core';

// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieGenreComponent>
  ) {}

  ngOnInit(): void {
  }

}
