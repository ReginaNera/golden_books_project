import { Category } from "./category";

export class Book {
    id: number;
    ImageUrl : string ;
    Title : string;
    Author : string;
    Year : Date;
    Categories : Category[];
    ISBN: string;
    Description: string;
    RevewerNeme: string; 
    Review: string;
}