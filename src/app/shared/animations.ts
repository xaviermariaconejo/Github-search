import { AnimationEntryMetadata } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Transition between routing
export const routingAnimation: AnimationEntryMetadata =
  trigger('fadeInOutRouting', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate(900)
    ]),
    transition(':leave', [
      animate(300, style({opacity: 0}))
    ])
  ]);

// Transition between pagination
export const itemsAnimation: AnimationEntryMetadata =
  trigger('fadeInOutItems', [
    state('*', style({opacity: 1})),
    transition(':enter', [
      style({opacity: 0}),
      animate(600)
    ]),
    transition(':leave', [
      animate(600, style({opacity: 0}))
    ])
  ]);
