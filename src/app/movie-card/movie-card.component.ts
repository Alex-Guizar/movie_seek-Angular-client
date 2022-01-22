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
  favorites: any[] = [];
  testing: boolean = false;
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  /**
   * Retrieve user, favorites list from storage
   * and full movies list on initialization.
   */
  ngOnInit(): void {
    const userFavorites: any = localStorage.getItem('favorites');
    this.currentUser = localStorage.getItem('user');
    if (userFavorites !== null) {
      this.favorites = JSON.parse(userFavorites);
    }
    this.getMovies();
  }

  /**
   * Retrieve movies list from api
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      return this.movies;
    });
  }

  /**
   * Open dialog with genre information
   * from movie object.
   * @param movie 
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(MovieGenreComponent, {
      data: movie.Genre,
      width: '400px'
    });
  }

  /**
   * Open dialog with director information
   * from movie object.
   * @param movie 
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(MovieDirectorComponent, {
      data: movie.Director,
      width: '400px'
    });
  }

  /**
   * Open dialog with movie details
   * from movie object.
   * @param movie 
   */
  openDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
      width: '400px'
    });
  }

  /**
   * Pass current user and movie id to api to
   * add a movie to the favorites list.
   * @param movieId string
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addUserFavorite(this.currentUser, movieId).subscribe((result: any) => {
      // Add color change to favorite icon
      this.favorites = result.FavoriteMovies;
      localStorage.setItem('favorites', JSON.stringify(result.FavoriteMovies));
    });
  }

  /**
   * Pass current user and movie id to api to
   * remove a movie to the favorites list.
   * @param movieId string
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteUserFavorite(this.currentUser, movieId).subscribe((result: any) => {
      this.favorites = result.FavoriteMovies;
      localStorage.setItem('favorites', JSON.stringify(result.FavoriteMovies));
    })
  }
}
