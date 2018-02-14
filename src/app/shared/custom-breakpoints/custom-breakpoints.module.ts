import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  DEFAULT_BREAKPOINTS,
  BREAKPOINTS,
  BreakPoint,
  validateSuffixes
} from '@angular/flex-layout'

function updateBreakpoints(bp:BreakPoint) {
  switch(bp.alias) {
    case 'xs'    : bp.mediaQuery =  '(min-width: 24em)'; break;
    case 'gt-xs' : bp.mediaQuery =  '(min-width: 29.75em)'; break;
    case 'sm'    : bp.mediaQuery =  '(min-width: 39.8em)'; break;
    case 'gt-sm' : bp.mediaQuery =  '(min-width: 46.8em)'; break;
    case 'md'    : bp.mediaQuery =  '(min-width: 48em)'; break;
    case 'gt-md' : bp.mediaQuery =  '(min-width: 50em)'; break;
    case 'lg'    : bp.mediaQuery =  '(min-width: 54.5em)'; break;
    case 'gt-lg' : bp.mediaQuery =  '(min-width: 60em)'; break;
    case 'xl'    : bp.mediaQuery =  '(min-width: 67em)'; break;
  }
  return bp;
}

@NgModule({
  imports : [ FlexLayoutModule ],
  exports : [ FlexLayoutModule ],
  providers: [
    // register a Custom BREAKPOINT Provider
    {
      provide: BREAKPOINTS,
      useFactory : function customizeBreakPoints() {
        return validateSuffixes(DEFAULT_BREAKPOINTS.map( updateBreakpoints ));
      }
    }
  ]
})
export class CustomBreakpointsModule { }
