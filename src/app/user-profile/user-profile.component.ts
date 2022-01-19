import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''}
  favorites: any[] = [];
  currentUser: any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getFavoriteMovies();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.currentUser, this.userData).subscribe((result: any) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  getFavoriteMovies(): void {
    if (localStorage.getItem('favorites')) {
      const storedFavoritesString: any = localStorage.getItem('favorites');
      const storedFavorites: any = JSON.parse(storedFavoritesString);
      this.fetchApiData.getAllMovies().subscribe((result: any) => {
        // Logic for a successful user registration goes here! (To be implemented)
        const movies: any[] = result;
        const favoriteMovies: any[] = [];
        storedFavorites.forEach((movieId: any) => {
          favoriteMovies.push(movies.find(m => m._id === movieId));
        });

        this.favorites = favoriteMovies;
        return this.favorites;
      });
    }
  }

  removeFavoriteMovie(movieId: any): void {
    this.fetchApiData.deleteUserFavorite(this.currentUser, movieId).subscribe((result: any) => {
      // Logic for a successful user registration goes here! (To be implemented)
      localStorage.setItem('favorites', JSON.stringify(result.FavoriteMovies));
      this.getFavoriteMovies();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.currentUser).subscribe((result: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
    });
  }
}
