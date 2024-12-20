import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BranchSelectionService } from '../branch-selection.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  branches$: Observable<{ branchId: number; country: string }[]>; // Use $ to indicate Observable
  selectedOption: { branchId: number; country: string } | null = null;

  constructor(
    private branchSelection: BranchSelectionService,
    private router: Router
  ) {
    // Fetch branches as an Observable
    this.branches$ = this.branchSelection.getAllBranches();

    // Log the response for debugging
    this.branches$.subscribe({
      next: (data) => console.log('Branches fetched:', data),
      error: (err) => console.error('Error fetching branches:', err),
    });
  }

  onOptionSelect(event: Event) {
    // Get the selected index
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex - 1; // -1 to account for placeholder
    if (selectedIndex >= 0) {
      // Get the branch using the index
      this.branches$.subscribe((branches) => {
        this.selectedOption = branches[selectedIndex];
        console.log('Selected Branch:', this.selectedOption);

        // Save selected branch and navigate
        if (this.selectedOption) {
          this.branchSelection.setSelectedBranch(this.selectedOption);
          console.log('Branch set in service:', this.selectedOption);
          this.router.navigate(['/main']);
        }
      });
    } else {
      console.error('No valid branch selected');
    }
  }
  }
  
