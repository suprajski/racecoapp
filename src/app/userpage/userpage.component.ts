import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  userDetails: any = null; // User details object
  tickets: any[] = []; // Array to store tickets

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDetails = this.userService.getLoggedInUser();
    if (this.userDetails?.userId) {
      this.loadUserTickets(this.userDetails.userId);
    }
  }

  loadUserTickets(userId: number): void {
    this.ticketService.getTicketsbyUser(userId).subscribe({
      next: (data) => {
        this.tickets = data;
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        alert('Failed to load tickets. Please try again.');
      },
    });
  }

  onLogout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Role checks
  isAdmin(): boolean {
    return this.userDetails?.role?.roleId === 1;
  }

  isManager(): boolean {
    return this.userDetails?.role?.roleId === 2;
  }

  isTrackMarshall(): boolean {
    return this.userDetails?.role?.roleId === 3;
  }

  isCustomer(): boolean {
    return this.userDetails?.role?.roleId === 4;
  }

  // Role-specific actions
  manageStaff(): void {
    this.router.navigate(['/manage']); // Replace with the actual route
  }

  manageTrackMarshalls(): void {
    this.router.navigate(['/manage']); // Replace with the actual route
  }

  viewReports(): void {
    this.router.navigate(['/viewreports']); // Replace with the actual route
  }

  fileReport(): void {
    this.router.navigate(['/report']);
  }
}