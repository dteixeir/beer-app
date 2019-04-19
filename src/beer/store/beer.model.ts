import { IBase } from '@shared/baseClasses';
import { ICategory, IStyle } from '@shared/interfaces';

export interface IBeer extends IBase {
  id: string;
  description: string;
  breweryId: string;
  abv: string;
  category: ICategory;
  style: IStyle;
  beerIds: string[];
  beers: IBeer[];
}
