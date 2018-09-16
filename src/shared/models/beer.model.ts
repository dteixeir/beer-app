import { IBase, Base } from '../baseClasses/base.model';
import { Category } from './category.model';
import { Style } from './style.model';

export interface IBeer extends IBase {
  description: string;
  breweryId: string;
  abv: string;
  category: Category;
  style: Style;
  beerIds: string[];
  beers: IBeer[];
}

export class Beer extends Base {
  description: string;
  breweryId: string;
  abv: string;
  category: Category;
  style: Style;
  beerIds: string[];
  beers: Beer[];

  constructor(beer: IBeer) {
    super(beer);

    this.name = beer.name;
    this.description = beer.description;
    this.description = beer.breweryId;
    this.abv = beer.abv;
    this.category = beer.category;
    this.style = beer.style;
  }
}
