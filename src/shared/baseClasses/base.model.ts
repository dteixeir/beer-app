export interface IBase {
  id: string;
  name: string;
}

export class Base {
  id: string;
  name: string;

  constructor(object: Base) {
    this.id = object.id;
    this.name = object.name;
  }
}
