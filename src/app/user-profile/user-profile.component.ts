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

  /**
   * Sends current user and new user data to the
   * edit user api.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.currentUser, this.userData).subscribe((result: any) => {
      // Logic for a successful user registration goes here! (To be implemented)
      let respMsg = ''
      if (Object.keys(result).length) {
        respMsg = "Success!"
      }
      this.snackBar.open(respMsg, 'OK', {
        duration: 2000
      });
    }, (result) => {
      let respMsg = 'I\'m sorry, something seems to have gone wrong. Please try again.'
      this.snackBar.open(respMsg, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Retrieves full list of movies, then compares movie ids
   * from the saved local storage favorites list to display
   * the favorited movie information.
   */
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

  /**
   * Passes current user and movie id to the delete user
   * favorite endpoint. Removing the specified movie
   * from the list.
   * @param movieId string
   */
  removeFavoriteMovie(movieId: string): void {
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

  /**
   * Passes the current user to the delete user
   * endpoint, removing their profile. Then deletes 
   * all local storage items on success.
   */
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.currentUser).subscribe((result: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
    });
  }
}
