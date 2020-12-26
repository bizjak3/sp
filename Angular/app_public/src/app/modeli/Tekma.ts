
export class Tekma {
    constructor(
        public kreator: string,
        public lat: number,
        public lng: number,
        public kraj: string,
        public datum: string,
        public ura: string,
        public minIgralcev: number,
        public maxIgralcev: number,
        public prijavljeni: number,
        public opis: string,
        public igralci: [string],
        public status: string,
        public zeOcenili: [string]
        
    ) { }
}
