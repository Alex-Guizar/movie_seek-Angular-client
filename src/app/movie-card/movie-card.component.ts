import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  currentUser: any = '';
  constructor(public fetchApiData: FetchApiDataService) { }

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

  addFavorite(movieId: any): void {
    this.fetchApiData.addUserFavorite(this.currentUser, movieId).subscribe((result: any) => {
      // Add color change to favorite icon
      console.log(result);
      localStorage.setItem('favorites', JSON.stringify(result.FavoriteMovies));
    });
  }
}
