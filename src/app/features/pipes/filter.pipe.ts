import { Pipe, PipeTransform } from "@angular/core";
import { zip } from "rxjs";
import { Book } from "../models/book";
import { Category } from "../models/category";

@Pipe ({
    name: "filterBooks"
})
export class FilterPipe implements PipeTransform{
    transform(books: any[], filter: Category[]) {
        console.log(filter)
        console.log(books)

        if(books.length === 0 || filter.length === 0){
            console.log('nula')
            return books;
         }else
         {
            console.log("uso u else")
            var filterbooks =  books.filter((book) => {
                var cat = book.Categories.find((cat : Category) => {
                    return filter.find(x=>x.name === cat.name)
                })

                if(cat != null)
                {
                    console.log("filter nije nula",  cat)
                    return book;
                }

            })

            
            if(filterbooks.length != 0)
            {
                console.log('filterbooks nije null')
                console.log(filterbooks.length)
                return filterbooks
            }
            else
            {
                console.log("filterbooks je nula")
                return books
            }
        }
    }
}
             

        // if(books.length === 0 || filter.length === 0){
        //     return books;
        // }else 
        // {
         
        //       var filterbooks =  books.filter((book) => {
        //       var cat = book.Categories.find((cat) => 
        //       {
        //          return filter.find(x => x.toLowerCase() == cat.name.toLowerCase())
        //       })

        //       if(cat != null)
        //       {
        //         return book;
        //       }
        //    })

        //     if(filterbooks != null)
        //     {
        //         return filterbooks;
        //     }
        //     else 
        //     {
        //         return books;
        //     }
        
        //  }
                    

   // }
//}