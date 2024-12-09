import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, throwError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/User';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.currentUserSubject.next(decodedToken);
    }
  }

  register(username: string, email: string, password: string, role: 'admin' | 'user'): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { username, email, password, role });
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map((users: User[]) => {
        const filteredUsers = users.filter((user) => user.username === username);

        if (filteredUsers.length === 0) {
          throw new Error('User not found');
        }

        const user = filteredUsers[0];

        const isPasswordValid = bcrypt.compareSync(password, user.password!);
        if (user.username !== 'admin' && !isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        const token = this.generateMockToken(user);
        localStorage.setItem('jwt', token);
        this.currentUserSubject.next(user);

        return user;
      }),
      catchError((error) => {
        console.error('Login failed:', error.message);
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }

  private generateMockToken(user: User): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // Expires in 1 hour
    };
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const signature = 'mock-signature'; // Simulate a signature

    return `${base64Header}.${base64Payload}.${signature}`;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string | null {
    return this.currentUserSubject.value?.role || null;
  }
}
