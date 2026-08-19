import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  errorMessage: string = '';

  users = [
    { email: 'a@a.com', password: 'asdf' },
    { email: 'b@b.com', password: '1234' },
    { email: 'c@c.com', password: 'qwerty' }
  ];

  constructor(private router: Router) { }

  login() {
    const matchedUser = this.users.find(
      user => user.email === this.email && user.password === this.password
    );

    if (matchedUser) {
      this.errorMessage = '';
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
      console.log(this.errorMessage);
    }
  }
}
