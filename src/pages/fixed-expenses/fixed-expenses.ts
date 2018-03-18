import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { FixedExpensesProvider } from '../../providers/fixed-expenses-services/fixed-expenses';

/**
 * Generated class for the FixedExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fixed-expenses',
  templateUrl: 'fixed-expenses.html',
})
export class FixedExpensesPage {
  sumFixedExpenses:any;
  fixedExpensesList:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sumFixedExpenses_: SumFixedExpensesProvider,
              public fixedExpenses_: FixedExpensesProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedExpensesPage');

    this.sumFixedExpenses_.getSumFixedExpenses().then(data => {
      this.sumFixedExpenses = data;
    })

    this.fixedExpenses_.getFixedExpenses().then(data => {
      this.fixedExpensesList = data;
      console.log(this.fixedExpensesList);
      
    })
  }

}
