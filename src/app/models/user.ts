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
