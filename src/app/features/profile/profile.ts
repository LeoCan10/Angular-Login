import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { PasswordStrengthDirective } from "../../shared/password-strength";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgIf,
    PasswordStrengthDirective
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm!: FormGroup;
  hidePassword = true;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSave() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value as User;
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      localStorage.setItem('session', JSON.stringify(updatedUser));
      this.snack.open('Perfil actualizado ✅', 'Cerrar', { duration: 3000 });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
