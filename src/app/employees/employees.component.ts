import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchSelectionService } from '../branch-selection.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  employees: any[] = [];
  currentUser: any;
  roles: any[] = [];
  filteredRoles: any[] = [];
  branches: { branchId: number; country: string }[] = [];
  showAddEmployeeForm: boolean = false;
  addEmployeeForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private branchService: BranchSelectionService,
    private fb: FormBuilder
  ) {
    this.addEmployeeForm = this.fb.group({
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
      role: this.fb.group({
        roleId: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRoles();
    this.loadBranches();
    this.currentUser = this.userService.getLoggedInUser();
  }

  loadEmployees(): void {
    this.userService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.errorMessage = 'Failed to load employees. Please try again later.';
      },
    });
  }
  loadBranches(): void{
  this.branchService.getAllBranches().subscribe({
    next: (branches) => (this.branches = branches),
    error: (error) => console.error('Error fetching branches:', error),
  });
  }
  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.filterRolesByUserRole();
      },
      error: (err) => {
        console.error('Error loading roles:', err);
      },
    });
  }
  fireEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to fire this employee?')) {
      this.userService.fireEmployee(employeeId).subscribe({
        next: () => {
          alert('Employee fired successfully.');
          this.loadEmployees(); // Refresh the employee list
        },
        error: (err) => {
          console.error('Error firing employee:', err);
          alert('Failed to fire the employee. Please try again.');
        },
      });
    }
  }

  canFireEmployee(employee: any): boolean {
    if (!this.currentUser || !this.currentUser.role) {
      // If currentUser or its role is null, no one can be fired
      return false;
    }
  
    // Admins (roleId = 1) can fire anyone
    if (this.currentUser.role.roleId === 1) {
      return true;
    }
  
    // Managers (roleId = 2) can only fire Track Marshalls (roleId = 3)
    if (this.currentUser.role.roleId === 2 && employee.role.roleId === 3) {
      return true;
    }
  
    // Other roles cannot fire employees
    return false;
  }


  filterRolesByUserRole(): void {
    const loggedInUser = this.userService.getLoggedInUser(); // Assuming `getLoggedInUser` provides current user details
    if (loggedInUser?.role?.roleId === 2) {
      // If logged-in user has roleId = 2, only allow "Track Marshall"
      this.filteredRoles = this.roles.filter((role) => role.roleName === 'Track Marshall');
    } else {
      // Otherwise, allow all roles except "Standard User" (roleId = 4)
      this.filteredRoles = this.roles.filter((role) => role.roleId !== 4);
    }
  }

  openAddEmployeeForm(): void {
    this.showAddEmployeeForm = true;
  }

  closeAddEmployeeForm(): void {
    this.showAddEmployeeForm = false;
    this.addEmployeeForm.reset();
  }

  onAddEmployee(): void {
    console.log('Form Valid:', this.addEmployeeForm.valid);
    console.log('Form Errors:', this.addEmployeeForm.errors);
    console.log('Form Values:', this.addEmployeeForm.value);
  
    if (this.addEmployeeForm.invalid) {
      alert('The form is invalid. Please check the fields.');
      return;
    }
  
    const newEmployee = this.addEmployeeForm.value;
  
    this.userService.signup(newEmployee).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.loadEmployees();
        this.closeAddEmployeeForm();
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        alert('Failed to add employee. Please try again.');
      },
    });
  }
}