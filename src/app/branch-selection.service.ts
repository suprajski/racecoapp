import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Branch {

branchId: number;
country: string;

}

@Injectable({
  providedIn: 'root'
})
export class BranchSelectionService {

  private apiUrl = 'http://localhost:8081/branches'

  constructor(private http: HttpClient){}

  private selectedBranch: { branchId: number; country: string } | null = null;

  setSelectedBranch(branch: { branchId: number; country: string }) {
    this.selectedBranch = branch;
    console.log('Branch set in service:', this.selectedBranch);
  }

  getSelectedBranch() {
    console.log('Branch set in service:', this.selectedBranch);
    return this.selectedBranch;
    
  }

  getAllBranches(): Observable<Branch[]>{
    return this.http.get<Branch[]>(`${this.apiUrl}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching comments:', error);
        throw error;
      })
    );
}
}
