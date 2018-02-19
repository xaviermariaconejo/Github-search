import { Injectable }               from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';

import { User } from '../models/user';

import { Observable }                         from 'rxjs/Observable';
import { of }                                 from 'rxjs/observable/of';
import { catchError, retry, share, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class GithubService {
  // Api url
  private githubApiUrl: string = "https://api.github.com";
  // Limited by Github Api v3
  private limitedItemsToSearch: number = 1000;
  // Use this to optimize
  name: string = '';
  search: any = { total_count: 0, items: [] };

  constructor(private http: HttpClient) { }

  reset(): void {
    this.name = '';
    this.search = { total_count: 0, items: [] };
  }

  getUser(page: string, name: string): Observable<any> {
    if (this.search.items[page]) {
      let user: User = this.search.items[page].find(user => user.loginName === name);
      if (user) {
        if (!user.createdAt) {
          let index: number = this.search.items[page].indexOf(user);
          return new Observable<any>(observer => {
              this.queryUser(name).subscribe(item => {
                this.search.items[page][index] = item;
                observer.next(item);
                observer.complete();
              });
          });
        }
        else {
          return of(user);
        }
      }
      else {
        // This should never happen, because if the
        // page exists the user should be in there
        return this.queryUser(name);
      }
    }
    else {
      return this.queryUser(name);
    }
  }

  private queryUser(name: string): Observable<any> {
    const url = `${this.githubApiUrl}/users/${name}`;
    return this.http.get(url, httpOptions)
      .pipe(
        retry(3),
        share(),
        map(res => {
          let user: User = new User();
          user.init(res);
          return user;
        }),
        catchError(this.handleError('getUser'))
      );
  }

  getFollowers(user: User, page: string, name: string): Observable<any> {
    if (!user.followersList) {
      return this.http.get(user.apiFollowers, httpOptions)
        .pipe(
          retry(3),
          share(),
          map((res: any) => {
            user.followersList = res.map(item => {
              let follower: User = new User();
              follower.init(item);
              return follower;
            });
            if (this.search.items[page]) {
              let index: number = this.search.items[page].indexOf(user);
              this.search.items[page][index].followersList = user.followersList;
            }
            return user.followersList;
          }),
          catchError(this.handleError('getFollowers'))
        );
    }
    else {
      return of(user.followersList);
    }
  }

  getRepositories(user: User, page: string, name: string): Observable<any> {
    if (!user.publicReposList) {
      return this.http.get(user.apiRepos, httpOptions)
        .pipe(
          retry(3),
          share(),
          map((res: any) => {
            user.publicReposList = res;
            if (this.search.items[page]) {
              let index: number = this.search.items[page].indexOf(user);
              this.search.items[page][index].publicReposList = user.publicReposList;
            }
            return user.publicReposList;
          }),
          catchError(this.handleError('getRepositories'))
        );
    }
    else {
      return of(user.publicReposList);
    }
  }

  searchUsers(name: string, page: number = 1, per_page: number = 60): Observable<any> {
    if (this.name !== name) {
      this.name = name;
      this.search = { total_count: 0, items: [] };
    }
    const url = `${this.githubApiUrl}/search/users?q=${name}&page=${page}&per_page=${per_page}`;
    return this.http.get(url, httpOptions)
      .pipe(
        retry(3),
        share(),
        map(res => {
          this.search.items[page] = res["items"].map(item => {
            let user: User = new User();
            user.init(item);
            return user;
          });
          res["items"] = this.search.items;
          res["total_count"] = res["total_count"] > this.limitedItemsToSearch ? this.limitedItemsToSearch : res["total_count"];
          this.search.total_count = res["total_count"];
          return res;
        }),
        catchError(this.handleError('searchUsers'))
      );
  }

  dummy(): Observable<any> {
    return new Observable<any>(observer => {
      setTimeout(_ => {
        observer.next("1");
      }, 300);

      setTimeout(_ => {
        observer.next("2");
      }, 900);

      setTimeout(_ => {
        observer.next("3");
        observer.complete();
      }, 1500);

      setTimeout(_ => {
        observer.next("4");
        observer.complete();
      }, 2100);
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console instead
      console.error("Handle Error Service", error);
      if (result) {
        // Let the app keep running by returning an empty result.
        return of(result as T);
      }
      else {
        // Let the app keep running by sending the error message
        return of(error.error.message);
      }
    };
  }

}
