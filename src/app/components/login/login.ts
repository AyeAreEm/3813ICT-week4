import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  valid: boolean;
  username: string;
  birthday: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage = signal('');

  constructor(private router: Router, private http: HttpClient) { }

  login() {
    this.http.post<AuthResponse>('http://localhost:3000/api/auth', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.valid) {
          this.persistLoginState(response);
          this.router.navigate(['/profile']);
        } else {
          this.errorMessage.set('Invalid email or password. Please try again.');
        }
      },
      error: () => this.errorMessage.set('Something went wrong. Please try again later.')
    });
  }

  private persistLoginState(user: AuthResponse) {
    try {
      localStorage.setItem('auth', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    try {
      sessionStorage.setItem('auth', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save to sessionStorage', e);
    }
  }
}
