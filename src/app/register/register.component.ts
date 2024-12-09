import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {User} from '../model/User';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Check if passwords match
  get passwordMismatch(): boolean {
    return this.password !== this.confirmPassword;
  }

  onSubmit(): void {
    if (this.username && this.password && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        Swal.fire('Error', 'Passwords do not match', 'error');
        return;
      }

      this.isLoading = true;
      this.authService
        .register(this.username, this.email, this.password, 'user')
        .subscribe({
          next: (response: User) => {
            this.authService.login(this.username, this.password).subscribe({
              next: (loginResponse: User) => {
                this.isLoading = false;
                Swal.fire('Success', 'Registration and login successful!', 'success').then(() => {
                  this.router.navigate(['/']); // Redirect to home after login
                });
              },
              error: (err) => {
                this.isLoading = false;
                Swal.fire('Error', 'Login failed after registration', 'error');
                console.error(err);
              },
            });
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire('Error', `Registration failed: ${err.message}`, 'error');
            console.error(err);
          },
        });
    }
  }
}
