import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StoredUser {
  username: string;
  birthday: string;
  age: number;
  email: string;
  valid: boolean;
}

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  imageUrl: string = "https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg";

  profileForm: FormGroup;
  saved = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      birthday: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const user: StoredUser = JSON.parse(stored);
      this.profileForm.patchValue({
        username: user.username,
        birthday: user.birthday,
        age: user.age,
        email: user.email,
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const stored = localStorage.getItem('auth');
    const existing: StoredUser = stored ? JSON.parse(stored) : { valid: true };

    const updated: StoredUser = {
      ...existing,
      ...this.profileForm.value,
    };

    localStorage.setItem('auth', JSON.stringify(updated));

    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
