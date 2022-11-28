import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { BookService } from 'src/app/shared/services/books.service';
import { Book } from '../../models/book';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CategoryService } from 'src/app/shared/services/categories.service';
import { Category } from '../../models/category';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  selectedCategories: Category[] = [];
   filterPipe = new FilterPipe();

 // filter : string[] = [];
 categoryform: FormGroup;
 index : Category;
 filter : Category[] = [];
  books$ : Observable<Book[]>
  books: Book[];
  categories: Category[] =[];
  pageSlice : Book[] =[];
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [2, 4, 6];
  search: string = ''
  constructor(private bookService : BookService, 
              private categoryService : CategoryService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}
 

  ngOnInit(): void {
      
      this.getAllBooks()
      this.getAllCategories();
      this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.filter=[];
      if(paramMap.get('category') != null)
      {
        this.getBooks();
         this.index  = this.categories.find(x=>x.name == paramMap.get('category'))
        console.log(this.index)
       // this.filter.push(paramMap.get('category'));
        this.filter.push(this.index);

      }
   });

    this.categoryform = this.formBuilder.group({
       category: this.filter
    })
      
    this.onChanges()
  }

    onChanges(): void {
      this.categoryform.get('category').valueChanges.subscribe(val => {
        this.selectedCategories = val;
        this.selectedCategories.forEach((cat) => {
          let exist = this.filter.find(x=> x.id == cat.id)
          if(exist ==null)
          {
            this.filter.push(cat);
          }
        })
        console.log(this.books)
        this.pageSlice= this.filterPipe.transform(this.pageSlice,this.filter).slice(0,3);
        console.log(this.pageSlice)
      });
    }
  
  getAllBooks() {
      this.bookService.fetchBooks();
      this.books$=this.bookService.books();
      this.getBooks();

  }

  getAllCategories() {
    this.categoryService.categories().subscribe((categories) => {
        this.categories=categories;
    });
    
  }

  getBooks() {
    this.books$.subscribe(books =>
      {
        this.books=books;
        this.pageSlice = books.slice(0,3);

      });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
     if (endIndex > this.books.length) {
       endIndex = this.books.length;
     }
  
   this.pageSlice = this.books.slice(startIndex, endIndex);
  }

  onSearch($event : any)
  {
    const value = $event.target.value;
    this.search =value;
  }




}
