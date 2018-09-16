import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'detail-button-bar',
  templateUrl: './detail-button-bar.component.html',
  styleUrls: [ './detail-button-bar.component.scss' ]
})
export class DetailButtonBarComponent {
  @Input() isEditing: boolean = false;
  @Input() delete: Function;
  
  public isAdmin: boolean = false;

  constructor(
    private location: Location
  ) {

  }

  back() {
    this.location.back();
  }
}
