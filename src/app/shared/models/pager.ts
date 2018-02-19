export class Pager {
  constructor(
    // Api
    public itemsPerLoad: number,
    public currentApiPage: number,
    // Pagination
    public totalItems: number,
    public currentPage: number,
    public pageSize: number,
    public totalPages: number,
    public startPage: number,
    public endPage: number,
    public startIndex: number,
    public endIndex: number,
    public pages: number[]
  ) { }  
}
