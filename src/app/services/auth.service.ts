import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'auth_user';

  // registra al usuario
  register(user: User): boolean {
    // Verificar si existe
    const existing = localStorage.getItem(this.storageKey);
    if (existing) {
      const parsed = JSON.parse(existing);
      if (parsed.email === user.email) {
        return false; // ya existe
      }
    }
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    return true;
  }

  // Login
  login(email: string, password: string): boolean {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return false;

    const user = JSON.parse(data) as User;
    if (user.email === email && user.password === password) {
      localStorage.setItem('session', JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Usuario actual
  getCurrentUser(): User | null {
    const data = localStorage.getItem('session');
    return data ? JSON.parse(data) as User : null;
  }

  // Verifica autenticación
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Logout
  logout() {
    localStorage.removeItem('session');
  }
}
