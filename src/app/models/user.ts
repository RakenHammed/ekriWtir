import { Airport } from './airport';
import { Car } from './car';

export class User {
  constructor(
    public id?: number,
    public email?: string,
    public password?: string,
    public accountAddress?: string,
    public accountPrivateKey?: string,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public birthDate?: Date,
    public nationalId?: string,
    public isRenter?: string,
    public isRentee?: string,
    public isAdministrator?: string,
    public createdAt?: string,
    public updatedAt?: string,
  ) { }
}

export class Rentee {
  constructor(
    public id?: number,
    public user?: User,
    public airport?: Airport,
    public car?: Car,
  ) { }
}

export class Renter {
  constructor(
    public id?: number,
    public user?: User,
    public driverLicenseId?: number,
    public driverLicenseDateOfIssue?: Date,
    public airport?: Airport,
    public car?: Car,
  ) { }
}
