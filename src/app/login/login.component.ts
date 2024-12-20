import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  signinForm: FormGroup;

constructor(private fb: FormBuilder,private userService: UserService, private router: Router){
  this.signinForm = this.fb.group({
    email: ['', Validators.required],
    passwordHash: ['', Validators.required]
  });
}

onSubmit() {
  const credentials = this.signinForm.value;
  this.userService.login(credentials).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      localStorage.setItem('loggedInUser', JSON.stringify(response));
      this.router.navigate(['/']); // Navigate to home or dashboard
    },
    error: (error) => {
      console.error('Login failed:', error);
      this.errorMessage = 'Invalid email or password.';
    },
  });
}

}
