import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Report {
  reportId?: number; // Optional because it will be generated by the backend
  user: {
    userId: number;
    firstName?: string; // Optional if needed for display
    lastName?: string;  // Optional if needed for display
    email?: string;     // Optional if needed for display
  };
  track: {
    trackId: number;
    trackName?: string;
    city?: {
      cityId: number;
      cityName?: string; 
      postcode?: string; 
    };
  };
  whatHappened: string;
  timestamp: string; // ISO format date
  isResolved: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8081/reports'; 

  constructor(private http: HttpClient) { }

   // Submit a report
   submitReport(report: Partial<Report>): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}`, report);
  }

  // Fetch all reports
  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/unresolved`);
  }

  // Fetch a single report by ID
  getReportById(reportId: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${reportId}`);
  }

  // Mark a report as resolved
  resolveReport(reportId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${reportId}/resolve`, {});
  }
}
