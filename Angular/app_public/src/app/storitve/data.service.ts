import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../komponente/register/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<User>({
    name: "a",
    surname: "b",
    email: "c", 
    password: "d"
  })
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  updateUser(user: User) {
    this.messageSource.next(user)
  }
}
