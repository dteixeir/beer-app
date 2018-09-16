import { IBase, Base } from '../baseClasses/base.model';
import { Beer } from './beer.model';

export interface IBrewery extends IBase {
  city: string;
  country: string;
  description: string;
  state: string;
  beerIds: string[];
  beers: Beer[];
}

export class Brewery extends Base {
  city: string;
  country: string;
  description: string;
  state: string;
  beerIds: string[];
  beers: Beer[];

  constructor(brewery: IBrewery) {
    super(brewery);

    this.name = brewery.name;
    this.city = brewery.city;
    this.country = brewery.country;
    this.description = brewery.description;
    this.state = brewery.state;
    this.beerIds = brewery.beerIds;
    this.beers = [];
  }
}
