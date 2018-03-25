import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DispensableExpensesProvider } from '../../providers/summary-services/dispensable-expenses';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DispensableExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispensable-expenses',
  templateUrl: 'dispensable-expenses.html',
})
export class DispensableExpensesPage {

  dispensableExpList: any;

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dispensableExpenses: DispensableExpensesProvider,
              private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.animateClass = { 'fade-in-right-item': true };

    this.dispensableExpenses.getDispensableExpenses()
                .then((data: any) => {
                  this.dispensableExpList = data;
                }).catch(err => {
                  console.error(err);
      
                })
    
   }
   disExpensesDetail(item){
    // alert(item.channelExp);
    this.navCtrl.push("DispensableExpensesDetailPage",item);
   }

}
