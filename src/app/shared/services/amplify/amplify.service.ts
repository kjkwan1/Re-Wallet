import { Injectable } from '@angular/core';
import { Schema } from 'amplify/data/resource';

@Injectable({
  providedIn: 'root'
})
export class AmplifyService<K extends keyof Schema> {
  constructor() { }
}
