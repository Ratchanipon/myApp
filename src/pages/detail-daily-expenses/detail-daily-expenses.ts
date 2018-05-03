import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailDailyExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-daily-expenses',
  templateUrl: 'detail-daily-expenses.html',
})
export class DetailDailyExpensesPage {

  data:any;

  category:string;
  channel:string;
  amount:string;
  created:string;
  images:string="";

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

              this.data = this.navParams.data;

              this.category = this.data.category;
              this.channel = this.data.channel;
              this.amount = this.data.amount;
              this.created = this.data.created;
              this.images = this.data.images;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailDailyExpensesPage');

    this.animateClass = { 'fade-in-item': true };
  }

}
