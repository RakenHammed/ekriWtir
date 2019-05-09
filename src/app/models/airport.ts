export class Airport {
  constructor(
    public id?: number,
    public name?: string,
  ) { }
}

export class Airports {
  list: Airport[];
  constructor(
  ) {
    this.list = [
      new Airport(1, 'Tunis-Carthage International Airport'),
      new Airport(2, 'Enfidha – Hammamet International Airport'),
      new Airport(3, 'Monastir - Habib Bourguiba International Airport'),
      new Airport(4, 'Sfax - Thyna International Airport'),
    ]
  }
}
