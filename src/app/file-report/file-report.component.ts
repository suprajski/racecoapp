import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../report.service';
import { TrackService } from '../track.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from '../report.service';

@Component({
  selector: 'app-file-report',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './file-report.component.html',
  styleUrl: './file-report.component.css'
})
export class FileReportComponent {
  reportForm: FormGroup;
  tracks: any[] = []; // Replace with actual Track model if available

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private tracksService: TrackService,
    private router: Router
  ) {
    this.reportForm = this.fb.group({
      trackId: ['', [Validators.required]], // Selected track ID
      whatHappened: ['', [Validators.required]], // Description of the issue
    });
  }

  ngOnInit(): void {
    this.loadTracks();
  }

  loadTracks(): void {
    this.tracksService.getAllTracks().subscribe({
      next: (data) => {
        this.tracks = data;
      },
      error: (err) => {
        console.error('Error loading tracks:', err);
        alert('Failed to load tracks. Please try again.');
      },
    });
  }

  onSubmit(): void {
    if (this.reportForm.invalid) {
      return;
    }
  
    const reportData = {
      user: {
        userId: JSON.parse(localStorage.getItem('loggedInUser')!).userId,
      },
      track: {
        trackId: +this.reportForm.value.trackId,
      },
      whatHappened: this.reportForm.value.whatHappened,
      timestamp: new Date().toISOString(),
      isResolved: false,
    };
  
    console.log('Report Data:', reportData); // Debug log
  
    this.reportService.submitReport(reportData).subscribe({
      next: (response) => {
        alert('Report submitted successfully!');
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error('Error submitting report:', err);
        alert('Failed to submit report. Please try again.');
      },
    });
  }
}