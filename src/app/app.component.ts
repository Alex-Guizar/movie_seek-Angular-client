import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie_seek-Angular-client';
  loggedIn = (localStorage.getItem('token') !== null ? true: false);

  constructor(
    public router: Router
  ) { }

  /**
   * Detect whether a token exists in localStorage
   * If not, set loggedIn to false and provide reduced toolbar
   */
  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         this.loggedIn = (localStorage.getItem('token') !== null ? true: false);
      }
    });
  }

  /**
   * Toolbar logo navigation to 'movies'
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Toolbar profile navigation to 'profile'
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Toolbar logout. Removes all localStorage items
   * and navigates to 'welcome'
   */
  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    this.loggedIn = false;
    this.router.navigate(['welcome']);
  }
}
