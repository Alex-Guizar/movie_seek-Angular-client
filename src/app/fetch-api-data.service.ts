// Packages
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-seek-1949.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {

  }

  // Make an api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Make an api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Make an api call for the movie list endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the single movie endpoint
  public getOneMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the director endpoint
  public getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the genre endpoint
  public getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + name, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user endpoint
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user favorites endpoint to retrieve favorite movies
  public getUserFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/movies/', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user favorites endpoint to add a movie to favorites
  public addUserFavorite(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, null, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user favorites endpoint to remove a movie from the favorites
  public deleteUserFavorite(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user endpoint to edit information
  public editUser(username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Make an api call for the user endpoint to delete a user
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Extract response and return if available
  // Otherwise return an empty object
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  // Logs error to console and returns an error message.
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }

    return new Error('Something bad happened; please try again later.');
  }
}
