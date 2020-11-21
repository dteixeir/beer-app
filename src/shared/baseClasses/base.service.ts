import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from '../ui/ui.service';

@Injectable()
export abstract class BaseService {
  constructor(
    protected uiService: UIService,
    protected db: AngularFirestore
  ) { }

  init(): void { }

  baseError(error: Error, message: string = null) {
    const errorMessage = message || error.message;
    this.uiService.showSnackBar(errorMessage, null);
  }
}
