import { Injectable } from '@angular/core';
import { Pager }      from '../models/pager';
import * as _         from 'underscore';

@Injectable()
export class PaginationService {
  // Configuration values
  private itemsPerLoad: number = 60;  // items to load by call to the api
  private currentApiPage: number = 1; // current api page
  private pageSize: number = 10       // items per page
  // Acutal pager
  pager: Pager;

  constructor() { this.reset() }

  reset(): void {
    this.pager = new Pager(
      this.itemsPerLoad, this.currentApiPage, 0, 0,
      this.pageSize, 0, 0, 0, 0, 0, []
    );
  }

  checkCurrentApiPage(page: number): boolean {
    let currentApiPage: number = Math.floor((page - 1)/(this.itemsPerLoad/this.pageSize) + 1);
    if (this.currentApiPage !== currentApiPage) {
      this.currentApiPage = currentApiPage;
      this.pager.currentApiPage = currentApiPage;
      return false
    }
    else return true;
  }

  actualizePager(totalItems: number, currentPage: number = 1): Pager {
    // calculate total pages
    let totalPages: number = Math.ceil(totalItems / this.pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    }
    else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex: number = ((currentPage - 6*(this.currentApiPage - 1)) - 1) * this.pageSize;
    let endIndex: number = Math.min(startIndex + this.pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages: number[] = _.range(startPage, endPage + 1);

    // actualize pager
    this.pager = new Pager(
      this.itemsPerLoad,
      this.currentApiPage,
      totalItems,
      currentPage,
      this.pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    );
    return this.pager;
  }

}
