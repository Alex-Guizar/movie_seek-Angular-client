/**
 * Form allowing a user to log in, saving their token and basic information to the local storage.
 * @module
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Material Components
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Custom Components
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  /**
   * Sends form information to login api.
   * On success, sets the token, user, and favorites list in
   * local storage. Then navigates to the movies list.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user login goes here!
      this.dialogRef.close(); // This will close the modal on success!

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('favorites', JSON.stringify(result.user.FavoriteMovies));
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
