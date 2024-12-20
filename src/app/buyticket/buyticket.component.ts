import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { TicketService } from '../ticket.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buyticket',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './buyticket.component.html',
  styleUrl: './buyticket.component.css'
})
export class BuyticketComponent implements OnInit {
  eventId: number | null = null;
  eventDetails: any = null;
  participationType: string = 'Watch'; // Default participation type
  price: number = 50; // Default price for "Watch"

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventService,
    private ticketsService: TicketService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get eventId from route parameters
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    if (this.eventId) {
      this.loadEventDetails();
    } else {
      alert('Invalid event ID');
      this.router.navigate(['/events']); // Redirect back to events page
    }
  }

  loadEventDetails(): void {
    this.eventsService.getEventById(this.eventId!).subscribe({
      next: (data) => {
        this.eventDetails = data;
        if (this.eventDetails && this.eventDetails.canUsersRace) {
          this.participationType = 'Race'; // Default to 'Race' if racing is allowed
          this.price = 100;
        }
      },
      error: (err) => {
        console.error('Error loading event details:', err);
        alert('Failed to load event details. Redirecting back.');
        this.router.navigate(['/events']);
      },
    });
  }

  onParticipationTypeChange(): void {
    if (this.participationType === 'Race') {
      this.price = 100;
    } else if (this.participationType === 'Watch') {
      this.price = 50;
    }
  }


  confirmPurchase(): void {
    if (!this.participationType) {
      alert('Please select a participation type.');
      return;
    }

    const ticketRequest = {
      event: {
        eventId: this.eventId, // Event ID from route or event details
      },
      user: {
        userId: this.userService.getLoggedInUser()?.userId, // Replace with actual logged-in user ID
      },
      timestamp: new Date().toISOString(), // Current timestamp in ISO format
      price: this.price, // Dynamically determined price
      participationType: this.participationType, // Selected participation type
    };
  

    this.ticketsService.buyTicket(ticketRequest).subscribe({
      next: (response) => {
        alert('Ticket purchased successfully!');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Error purchasing ticket:', err);
        console.log(ticketRequest);
        alert('Failed to purchase ticket. Please try again.');
      },
    });
  }
}