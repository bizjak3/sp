import { PodatkiUporabnika } from "./PodatkiUporabnika";


export class Tekma {
    constructor(
        public _id: string,
        public kreator: PodatkiUporabnika,
        public lat: number,
        public lng: number,
        public kraj: string,
        public datum: string,
        public ura: string,
        public minIgralcev: number,
        public maxIgralcev: number,
        public prijavljeni: number,
        public opis: string,
        public igralci: [PodatkiUporabnika],
        public status: string,
        public zeOcenili: [string]
        
    ) { }
}
