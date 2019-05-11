import { User } from './user';

export class Car {
    constructor(
        public id?: number,
        public firstCirculationDate?: Date,
        public manufacturer?: string,
        public model?: string,
        public fromDate?: Date,
        public toDate?: Date,
        public fuelType?: string,
        public costPerDay?: string,
        public renter?: User,
        public rentee?: User,
    ) { }
}
