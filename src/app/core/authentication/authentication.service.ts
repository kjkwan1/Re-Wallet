import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { signUp, signIn, AuthError } from "aws-amplify/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _authenticated = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  get isAuthenticated$() {
    return this._authenticated.asObservable();
  }

  get isAuthenticated() {
    return this._authenticated.getValue();
  }
  public async authenticate(email: string, password: string): Promise<boolean> {
    const result = await signIn({ username: email, password });
    this._authenticated.next(result.isSignedIn);
    return result.isSignedIn;
  }

  public async register(email: string, password: string): Promise<boolean> {
    const result = await signUp({ username: email, password, options: { userAttributes: { email }}});
    if (!result.isSignUpComplete) {
      throw new AuthError({ message: 'Failed to register!', name: 'RegisterError' });
    }

    return result.isSignUpComplete;
  }

  public logout(): Promise<boolean> {
    this._authenticated.next(false);
    return Promise.resolve(true);
  }
}
