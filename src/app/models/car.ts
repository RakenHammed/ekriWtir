import { User } from 'app/models/user';

export class Car {
    constructor(
        public id?: number,
        public firstCirculationDate?: Date,
        public constructor?: string,
        public model?: string,
        public fromDate?: Date,
        public toDate?: Date,
        public fuelType?: string,
        public costPerDay?: string,
        public renter?: User,
        public rentee?: User,
    ) { }
}
