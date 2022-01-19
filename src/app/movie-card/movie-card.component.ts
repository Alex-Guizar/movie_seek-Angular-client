import { Component, OnInit } from '@angular/core';

// Angular Material
import { MatDialog } from '@angular/material/dialog';

// Custom Components
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any = '';
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: movie.Genre,
      width: '400px'
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(MovieDirectorComponent, {
      data: movie.Director,
      width: '400px'
    });
  }

  openDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
      width: '400px'
    });
  }

  addFavorite(movieId: any): void {
    this.fetchApiData.addUserFavorite(this.currentUser, movieId).subscribe((result: any) => {
      // Add color change to favorite icon
      console.log(result);
      localStorage.setItem('favorites', JSON.stringify(result.FavoriteMovies));
    });
  }
}
