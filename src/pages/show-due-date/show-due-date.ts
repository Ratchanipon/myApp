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
  electricity: number;
  internet: number;
  telephone: number;

  credit_card1: number;
  credit_card2: number;
  credit_card3: number;
  credit_card4: number;
  credit_card5: number;
  credit_name1: string;
  credit_name2: string;
  credit_name3: string;
  credit_name4: string;
  credit_name5: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dueDate: DueDateByUserIdProvider,
              ) {

                this.dueDate.getDueDate().then((data:any) => {
                  this.water = data.water;
                  this.electricity = data.electricity;
                  this.internet = data.internet;
                  this.telephone = data.telephone;
                });

                this.dueDate.getCreditCard1().then((data:any) => {
                  this.credit_card1 = data.credit_card;
                  this.credit_name1 = data.credit;       
                });
                this.dueDate.getCreditCard2().then((data:any) => {
                  this.credit_card2 = data.credit_card;
                  this.credit_name2 = data.credit;       
                });
                this.dueDate.getCreditCard3().then((data:any) => {
                  this.credit_card3 = data.credit_card;
                  this.credit_name3 = data.credit;       
                });
                this.dueDate.getCreditCard4().then((data:any) => {
                  this.credit_card4 = data.credit_card;
                  this.credit_name4 = data.credit;       
                });
                this.dueDate.getCreditCard5().then((data:any) => {
                  this.credit_card5 = data.credit_card;
                  this.credit_name5 = data.credit;       
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowDueDatePage');
  }

}
