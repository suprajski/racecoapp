import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Track, TrackService } from '../track.service';
import { BranchSelectionService } from '../branch-selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trackpage',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './trackpage.component.html',
  styleUrl: './trackpage.component.css'
})
export class TrackpageComponent implements OnInit{
 
  branchId: number | null = null ; // Replace with dynamic branch ID if needed
  branchCountry: any;
  tracks: Track[] = [];

 constructor(private trackService: TrackService,private branchSelection: BranchSelectionService){}
 
  ngOnInit(): void {
    const selectedBranch = this.branchSelection.getSelectedBranch();
    if(selectedBranch){
      this.branchId = selectedBranch.branchId;
      this.branchCountry = selectedBranch.country;
    }
    this.getTracks();
  }

  getTracks() {
    if (this.branchId !== null) {
      this.trackService.getTracksByBranch(this.branchId).subscribe({
        next: (data) => {
          this.tracks = data;
        },
        error: (err) => {
          console.error('Error fetching tracks:', err);
          alert('Error fetching tracks. Please try again.');
        },
      });
    }
  }
}
