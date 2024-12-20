import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Track {
  trackId: number;
  trackName: string;
  city: {
    cityId: number;
    cityName: string;
    postcode: string;
    branch: {
      branchId: number;
      country: string;
    };
  };
  branch: {
    branchId: number;
    country: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  

  private apiUrl = 'http://localhost:8081/tracks'

  constructor(private http: HttpClient) { }

  getTracksByBranch(branchId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/branch/${branchId}`);


  }

  getAllTracks(): Observable<Track[]>{
    return this.http.get<Track[]>(`${this.apiUrl}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching tracks:', error);
        throw error;
      })
    );
}
}
