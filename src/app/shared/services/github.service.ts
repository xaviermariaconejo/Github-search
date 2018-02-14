import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GithubService {

  constructor() {  }

  getUser(id: string): Observable<User> {
    console.log("GET USER: " + id);
    return of(new User());
    // return of(HEROES.find(hero => hero.id === id));
  }

}
