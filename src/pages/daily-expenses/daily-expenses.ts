import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { DailyExpensesProvider } from '../../providers/daily-expenses-services/daily-expenses';

/**
 * Generated class for the DailyExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-expenses',
  templateUrl: 'daily-expenses.html',
})
export class DailyExpensesPage {
  sumDailyExpenses:any;
  dailyExpensesList:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sumDailyExpenses_: SumDailyExpensesProvider,
              public dailyExpenses_: DailyExpensesProvider) {

                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyExpensesPage');

    this.sumDailyExpenses_.getSumDailyExpenses().then(data => {
      this.sumDailyExpenses = data;
    })

    this.dailyExpenses_.getDailyExpenses().then(data => {
      this.dailyExpensesList = data;
    })
  }

}
