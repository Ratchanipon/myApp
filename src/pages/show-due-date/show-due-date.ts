import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';
import { DueDate } from '../../model/due-date';

/**
 * Generated class for the ShowDueDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-due-date',
  templateUrl: 'show-due-date.html',
})
export class ShowDueDatePage {


  water:number;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dueDate: DueDateByUserIdProvider,
              ) {

                this.dueDate.getDueDate().then((data:any) => {
                  
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDueDatePage');
  }

}
