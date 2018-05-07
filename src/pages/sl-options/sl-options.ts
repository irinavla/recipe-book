import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Store & Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline block (click)="onAction('load')">Load list</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline block (click)="onAction('store')">Save</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class SlOptionsPage {

  constructor(public viewCtrl: ViewController) {
  }

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action });
  }

}
