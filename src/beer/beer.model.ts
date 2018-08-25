import { IBase } from '../shared/baseClasses/base.model';

export interface IBeer extends IBase {
  name: string;
  description: string;
  breweryId: string;
  abv: string;
  category: {
    id: string;
    name: string;
  };
  style: {
    id: string;
    name: string;
  };
}
