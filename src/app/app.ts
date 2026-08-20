import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('week4');

  constructor(private router: Router) { }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

  logout(): void {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
