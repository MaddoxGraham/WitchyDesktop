
export class Categories {
    constructor(public id:number,
        public parentId:number | null,
        public nomination:string,
        public slug:string,
        public subCategories: Categories[] | null ){}

}