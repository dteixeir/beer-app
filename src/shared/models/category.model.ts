import { Base } from '../baseClasses/base.model';

export class Category extends Base  {
  constructor(category: Category) {
    super(category);

    this.name = category.name;
  }
}
