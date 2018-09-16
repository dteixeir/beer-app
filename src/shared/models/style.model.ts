import { Base } from '../baseClasses/base.model';

export class Style extends Base  {
  constructor(style: Style) {
    super(style);

    this.name = style.name;
  }
}
