import { DocumentReference } from '@angular/fire/firestore';
import { IBeer } from '@fromBeer';
import { IBase } from '@shared/interfaces';

export interface IBrewery extends IBase {
  city: string;
  country: string;
  description: string;
  state: string;
  beerRefs: DocumentReference[];
  beers: IBeer[];
}
