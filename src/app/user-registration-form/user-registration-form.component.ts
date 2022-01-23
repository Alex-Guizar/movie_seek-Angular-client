/**
 * Form for a user to create a profile. Accepts a Username, Password, Email, and Birthday.
 * @module
 */
import { Component, OnInit, Input } from '@angular/core';

// Angular Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Custom Components
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
  }
  
  /**
   * Sends form information to registration api for creation
   * of a new user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      let respMsg = ''
      if (Object.keys(result).length) {
        respMsg = "Success!"
      }
      this.snackBar.open(respMsg, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
