import { IBase } from '../shared/baseClasses/base.model';

export interface IBrewery extends IBase {
  name: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  description: string;
  filepath: string;
  phone: string;
  state: string;
  website: string;
}
