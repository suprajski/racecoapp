import { Component,OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { BranchSelectionService } from '../branch-selection.service';
import { Event } from '../event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eventpage',
  standalone: true,
  imports: [MenuComponent,CommonModule,RouterModule],
  templateUrl: './eventpage.component.html',
  styleUrl: './eventpage.component.css'
})
export class EventpageComponent implements OnInit {
  
  branchId: number | null = null ; // Replace with dynamic branch ID if needed
  branchCountry: any;
  events: Event[] = [];

  constructor(private eventService: EventService,private branchSelection: BranchSelectionService){}
 
  ngOnInit(): void {
    const selectedBranch = this.branchSelection.getSelectedBranch();
    if(selectedBranch){
      this.branchId = selectedBranch.branchId;
      this.branchCountry = selectedBranch.country;
    }
    this.getEvents();
  }

  getEvents() {
    if (this.branchId !== null) {
      this.eventService.getEventsByBranch(this.branchId).subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (err) => {
          console.error('Error fetching tracks:', err);
          alert('Error fetching tracks. Please try again.');
        },
      });
    }
  }

}
