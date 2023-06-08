export class Produits{
    constructor(
        public id:number,
        public ShortLibel:string,
        public LongLibel:string,
        public prxHt:number,
        public slug:string,
        public categorie : string,
        public photos:any[]
        ){}

}