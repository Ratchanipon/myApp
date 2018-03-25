import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpensesDebtProvider } from '../../providers/summary-services/expenses-debt';

/**
 * Generated class for the ExpensesDebtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses-debt',
  templateUrl: 'expenses-debt.html',
})
export class ExpensesDebtPage {
  expensesDebtList:any;

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public expensesDebt: ExpensesDebtProvider) {

                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesDebtPage');
    this.animateClass = { 'fade-in-right-item': true };


    this.expensesDebt.getExpensesDebt().then(data => {
      this.expensesDebtList = data;
    })
  }

}
