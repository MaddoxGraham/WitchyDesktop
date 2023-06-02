import { Observable } from "rxjs";

export class Categories {
    constructor(public id:number,
        public parentId:number | null,
        public nomination:string,
        public slug:string,
        public subCategories: Observable<Categories[]> | null ){}

}