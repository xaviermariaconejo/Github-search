import { Component, HostBinding, OnInit } from '@angular/core';
import { routingAnimation }               from '../../shared/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [routingAnimation]
})
export class NotFoundComponent implements OnInit {
  // Routing animation
  @HostBinding('@fadeInOutRouting') fadeInOutRouting = true;
  @HostBinding('style.opacity')     opacity = 1;

  constructor() { }

  ngOnInit() { }

}
