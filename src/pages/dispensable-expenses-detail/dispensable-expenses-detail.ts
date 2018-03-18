import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DispensableExpensesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispensable-expenses-detail',
  templateUrl: 'dispensable-expenses-detail.html',
})
export class DispensableExpensesDetailPage {

  // dataItem:{categoryExp:"", channelExp:"", amount:"", create_date:""};
  dataItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispensableExpensesDetailPage');
    let data = this.navParams.data;
    console.log(data);
    this.dataItem = data;
    console.log(this.dataItem);
    
  }

}
