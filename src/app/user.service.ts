import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  userId: number; // Corresponds to Long userId
  firstName: string; // Corresponds to String firstName
  lastName: string; // Corresponds to String lastName
  email: string; // Corresponds to String email
  passwordHash?: string; // Corresponds to String passwordHash (optional for security)
  birthday?: Date; // Corresponds to Date birthday
  isLocked: boolean; // Corresponds to Boolean isLocked
  failedLoginAttempts: number; // Corresponds to Integer failedLoginAttempts
  lastLogin?: Date; // Corresponds to Date lastLogin
  address?: Address; // Corresponds to Address address
  role: Role; // Corresponds to Role role
}

// Address Interface
export interface Address {
  addressId: number; // Corresponds to Long addressId
  street: string; // Corresponds to String street
  city: City; // Corresponds to City city
}

// City Interface
export interface City {
  cityId: number; // Corresponds to Long cityId
  cityName: string; // Corresponds to String cityName
  postcode: string; // Corresponds to String postcode
  branch: Branch; // Corresponds to Branch branch
}

// Branch Interface
export interface Branch {
  branchId: number; // Corresponds to Long branchId
  country: string; // Corresponds to String country
}

// Role Interface
export interface Role {
  roleId: number; // Corresponds to Long roleId
  roleName: string; // Corresponds to the role name
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/users';

  constructor(private http: HttpClient) { }

  // Sign up a new user
  signup(user: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, user)
      .pipe(
        catchError(this.handleError<any>('signup'))
      );
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }

  // Sign in an existing user
  login(credentials: {username: string, password: string}): Observable<any> {
    const url = `${this.apiUrl}/signin`;
    return this.http.post<any>(url, credentials)
      .pipe(
        catchError(this.handleError<any>('signin'))
      );
  }

  // Get currently logged-in user from local storage
  getLoggedInUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('loggedInUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;

  }

  isUserLoggedIn(): boolean {
    
    return this.getLoggedInUser() !== null;
  }

  fireEmployee(employeeId: number): Observable<any> {
    const apiUrl = (`${this.apiUrl}/employees/${employeeId}`);
    return this.http.delete<any>(apiUrl);
  }


// Handle any errors that occur during HTTP requests
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console
    return of(result as T);
  };
}

}
