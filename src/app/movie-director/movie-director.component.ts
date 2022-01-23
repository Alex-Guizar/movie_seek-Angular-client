/**
 * Displays information about the selected movie's director.
 * @module
 */
import { Component, Inject, OnInit } from '@angular/core';

// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieDirectorComponent>
  ) { }

  ngOnInit(): void {
  }

}
