/**
 * Displays information about the selected movie.
 * @module
 */
import { Component, Inject, OnInit } from '@angular/core';

// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieDetailsComponent>
  ) { }

  ngOnInit(): void {
  }

}
