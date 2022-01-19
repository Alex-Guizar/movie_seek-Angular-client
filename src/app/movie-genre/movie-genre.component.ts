import { Component, Inject, OnInit } from '@angular/core';

// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Custom Components
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<MovieGenreComponent>
  ) {}

  ngOnInit(): void {
  }

}
