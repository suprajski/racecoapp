import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  ticketId: number;
  event: {
    eventId: number;
    eventName: string;
    startDate: string; // or Date if parsed
    canUsersRace: boolean;
    track: {
      trackId: number;
      trackName: string;
    };
  };
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  timestamp: Date; 
  price: number;
  participationType: string;
}
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8081/tickets'

  constructor(private http: HttpClient) { }

  buyTicket(ticketRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`,ticketRequest)

  }

  getTicketsbyUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
