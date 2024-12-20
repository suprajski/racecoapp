import { Component } from '@angular/core';
import { ReportService } from '../report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportpage.component.html',
  styleUrl: './reportpage.component.css'
})
export class ReportpageComponent {
  reports: any[] = [];
  errorMessage: string = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  resolveReport(reportId: number): void {
    if (confirm('Are you sure you want to mark this report as resolved?')) {
      this.reportService.resolveReport(reportId).subscribe({
        next: () => {
          alert('Report resolved successfully.');
          this.loadReports(); // Refresh the list of reports
        },
        error: (err) => {
          console.error('Error resolving report:', err);
          alert('Failed to resolve the report. Please try again.');
        },
      });
    }
  }

  loadReports(): void {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.errorMessage = 'Failed to load reports. Please try again.';
      },
    });
  }
}