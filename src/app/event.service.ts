import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Event {
  eventId: number; // Event ID
  track: Track; // Associated Track
  startDate: Date; // Start date of the event
  canUsersRace: boolean; // Whether users can race in this event
}

// Reusing the provided Track interface
export interface Track {
  trackId: number; // Track ID
  trackName: string; // Track name
  city: {
    cityId: number; // City ID
    cityName: string; // City name
    postcode: string; // City postcode
    branch: {
      branchId: number; // Branch ID
      country: string; // Branch country
    };
  };
  branch: {
    branchId: number; // Branch ID
    country: string; // Branch country
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/events'

  constructor(private http: HttpClient) { }

  getEventsByBranch(branchId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/branch/${branchId}`);
}

  getEventById(eventId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/${eventId}`);
  }

}