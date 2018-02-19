import { Component, HostBinding, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router }                                                           from '@angular/router';

import { routingAnimation, itemsAnimation } from '../../shared/animations';
import { User }                             from '../../shared/models/user';
import { Pager }                            from '../../shared/models/pager';
import { GithubService }                    from '../../shared/services/github.service';
import { PaginationService }                from '../../shared/services/pagination.service';

import { ISubscription }  from "rxjs/Subscription";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [routingAnimation, itemsAnimation]
})
export class SearchComponent implements OnInit {
  // Routing animation
  @HostBinding('@fadeInOutRouting') fadeInOutRouting = true;
  @HostBinding('style.opacity')     opacity = 1;

  // Search
  @ViewChild('nameToSearch') nameToSearch: ElementRef;
  loginName: string = ''; // string to search
  errorText: string = ''; // show posible errors

  // Pagination
  pager: Pager = null;       // pager to the view
  pagedUsers: User[] = [];  // items paged

  // For unsubscribe all the subscriptions
  private searchSubscription: ISubscription[] = [];

  constructor(private router: Router, private pagination: PaginationService, private api: GithubService) { }

  ngOnInit() {
    // Actualize pager from service
    this.pager = this.pagination.pager;
    if (this.pager && this.pager.currentPage) {
      this.loginName = this.api.name;
      this.nameToSearch.nativeElement.value = this.loginName;
      this.pagedUsers = this.api.search.items[this.pager.currentApiPage].slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    
    setTimeout(_ => {
      this.api.dummy().subscribe(res => {
        console.log("TEST", res);
      });
    }, 1000);
  }

  ngOnDestroy() {
    this.searchSubscription.map(subs => subs.unsubscribe());
  }

  // Reset
  reset(): void {
    this.api.reset();
    this.pagination.reset();
    this.loginName = '';
    this.errorText = '';
    this.pager = this.pagination.pager;
    this.pagedUsers = [];
  }

  // Select User
  selectUser(name: string): void {
    this.router.navigate([`user/${this.pager.currentApiPage}/${name}`]);
  }

  // Load users
  updateInputText(name: string): void {
    // Reset
    this.reset();
    // Make search
    this.loginName = name;
    if (this.loginName && this.loginName !== '') {
      const subscription = this.api.searchUsers(this.loginName, this.pager.currentApiPage, this.pager.itemsPerLoad)
        .subscribe(res => {
          if (typeof res === "string") {
            this.errorText = res;
          }
          else {
            // Initialize to page 1
            this.setPage(1);
          }
        });
      this.searchSubscription.push(subscription);
    }
  }

  setPage(page: number): void {
    // Reset for active animation
    this.pagedUsers = [];
    // Actualize pager service
    this.pager = this.pagination.actualizePager(this.api.search.total_count, page);
    if (this.pager && this.pager.totalPages && (page >= 1 && page <= this.pager.totalPages)) {
      // Load items if is needed
      if (this.pagination.checkCurrentApiPage(page)) {
        // Get current page of items, the Timeout is for give the animation time to apply
        setTimeout(_ => this.pagedUsers = this.api.search.items[this.pager.currentApiPage].slice(this.pager.startIndex, this.pager.endIndex + 1), 0);
      }
      else {
        this.pager.currentApiPage = this.pagination.pager.currentApiPage;
        if (this.api.search.items[this.pager.currentApiPage]) {
          // Actualize pager
          this.pager = this.pagination.actualizePager(this.api.search.total_count, page);
          // Get current page of items, the Timeout is for give the animation time to apply
          setTimeout(_ => this.pagedUsers = this.api.search.items[this.pager.currentApiPage].slice(this.pager.startIndex, this.pager.endIndex + 1), 0);
        }
        else {
          const subscription = this.api.searchUsers(this.loginName, this.pager.currentApiPage, this.pager.itemsPerLoad)
            .subscribe(res => {
              if (typeof res === "string") {
                this.errorText = res;
              }
              else {
                // Actualize pager
                this.pager = this.pagination.actualizePager(this.api.search.total_count, page);
                // Proceed with the pagination, the request give enough time to the animation to be applied
                this.pagedUsers = this.api.search.items[this.pager.currentApiPage].slice(this.pager.startIndex, this.pager.endIndex + 1);
              }
            });
          this.searchSubscription.push(subscription);
        }
      }
    }
  }

}
