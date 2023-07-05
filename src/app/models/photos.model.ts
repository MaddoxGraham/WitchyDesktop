export class Photos{
    constructor(
        public id: number,
        public src: string | null,
        public isPrimary: boolean,
        public RefProduit: string
    ){}
}