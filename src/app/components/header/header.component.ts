import { Component, HostBinding, OnInit } from '@angular/core';
import { Location }                       from '@angular/common';
import { Router }                         from '@angular/router';

import { routingAnimation }   from '../../shared/animations';
import { PaginationService } from '../../shared/services/pagination.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [routingAnimation]
})
export class HeaderComponent implements OnInit {
  // Routing animation
  @HostBinding('@fadeInOutRouting') fadeInOutRouting = true;
  @HostBinding('style.opacity')     opacity = 1;

  showSettings: boolean = false;

  constructor(private router: Router, private location: Location, private pagination: PaginationService) { }

  ngOnInit() { }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.pagination.reset();
    this.router.navigate([``]);
  }

}
