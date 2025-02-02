import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationRoutes } from './navigation.types';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  public navigateHome(): Promise<boolean> {
    return this.navigate('home');
  }

  public navigateRegister(): Promise<boolean> {
    return this.navigate('auth', 'register');
  }

  private navigate(...routes: NavigationRoutes[]): Promise<boolean> {
    return this.router.navigate([routes.join('/')], { queryParams: { }});
  }
}
