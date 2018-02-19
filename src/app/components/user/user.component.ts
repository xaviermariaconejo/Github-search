import { Component, HostBinding, OnInit, OnDestroy }  from '@angular/core';
import { Router, ActivatedRoute, ParamMap }           from '@angular/router';

import { routingAnimation } from '../../shared/animations';
import { User }             from '../../shared/models/user';
import { GithubService }    from '../../shared/services/github.service';

import { ISubscription }  from "rxjs/Subscription";
import { forkJoin }       from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routingAnimation]
})
export class UserComponent implements OnInit {
  // Routing animation
  @HostBinding('@fadeInOutRouting') fadeInOutRouting = true;
  @HostBinding('style.opacity')     opacity = 1;

  // Subscriptions container
  private searchSubscription: ISubscription[] = [];
  // User to the view
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private api: GithubService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    const page = this.route.snapshot.paramMap.get('page');
    const subscription = this.api.getUser(page, name)
      .subscribe(user => {
        this.user = user;
        let followers = this.api.getFollowers(this.user, page, name);
        let repositories = this.api.getRepositories(this.user, page, name);
        forkJoin([followers, repositories]).subscribe(results => {
          this.user.followersList = results[0];
          this.user.publicReposList = results[1];
        });
      });
    this.searchSubscription.push(subscription);
  }

  ngOnDestroy() {
    this.searchSubscription.map(subs => subs.unsubscribe());
  }

}
