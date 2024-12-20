import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service'; 
import { BranchSelectionService } from '../branch-selection.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  branches: { branchId: number; country: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private branchService: BranchSelectionService,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(6)]],
      birthday: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: this.fb.group({
          cityName: ['', Validators.required],
          postcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
          branch: this.fb.group({
            branchId: ['', Validators.required],
          }),
        }),
      }),
    });
  }

  ngOnInit() {
    // Fetch branches from backend
    this.branchService.getAllBranches().subscribe({
      next: (branches) => (this.branches = branches),
      error: (error) => console.error('Error fetching branches:', error),
    });
  }

  onSubmit() {
    console.log('Form Submitted:', this.registerForm.valid, this.registerForm.value);
  
    if (this.registerForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    const registrationData = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      passwordHash: this.registerForm.value.passwordHash, // Adjust field name
      birthday: this.registerForm.value.birthday,
      address: {
        street: this.registerForm.value.address.street,
        city: {
          cityName: this.registerForm.value.address.city.cityName,
          postcode: this.registerForm.value.address.city.postcode,
          branch: {
            branchId: this.registerForm.value.address.city.branch.branchId,
          },
        },
      },
      role: {
        roleId: 4,
      },
    };
  
    console.log('Sending payload:', registrationData);
  
    this.userService.signup(registrationData).subscribe({
      next: (response) => {
        console.log('API call successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('API call failed:', error);
      },
    });
  }
}