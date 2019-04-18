import { IBase, Base } from '../baseClasses/base.model';
import { Beer } from './beer.model';
import { DocumentReference } from '@angular/fire/firestore';

export interface IBrewery extends IBase {
  city: string;
  country: string;
  description: string;
  state: string;
  beerRefs: DocumentReference[];
  beers: Beer[];
}

export class Brewery extends Base {
  city: string;
  country: string;
  description: string;
  state: string;
  beerRefs: DocumentReference[];
  beers: Beer[];

  constructor(brewery: IBrewery) {
    super(brewery);

    this.name = brewery.name;
    this.city = brewery.city;
    this.country = brewery.country;
    this.description = brewery.description;
    this.state = brewery.state;
    this.beerRefs = brewery.beerRefs;
    this.beers = [];
  }
}
