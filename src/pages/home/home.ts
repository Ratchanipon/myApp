import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BalancedProvider } from '../../providers/calculate-services/balance';
import { User } from '../../model/user';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { MoneyPerDayProvider } from '../../providers/calculate-services/sum-money-perday';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user:User;
  balance:any;
  totalIncome:number;
  totalFixedExp:number;
  totalDailyExp:number;
  moneyPerDay:any;

  animateClass:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public balanced: BalancedProvider,
              public sumIncome: SumIncomeProvider,
              public sumFixedExpenses: SumFixedExpensesProvider,
              public sumDailyExpenses: SumDailyExpensesProvider,
              public moneyPerDay_: MoneyPerDayProvider,
              private app:App
            ) {

              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.animateClass = { 'fade-in-right-item': true };
    
    this.user = this.navParams.get('user');
                console.log(this.user);
                
    this.balanced.getBalanced().then(data => {
      console.log(data);
      this.balance = data;
    })

    this.sumIncome.getSumIncome().then((data:number) => {
      this.totalIncome = data;
    })

    this.sumFixedExpenses.getSumFixedExpenses().then((data:number) => {
      this.totalFixedExp = data;
    })

    this.sumDailyExpenses.getSumDailyExpenses().then((data:number) => {
      this.totalDailyExp = data;
    })

    this.moneyPerDay_.getMoneyPerDay().then(data => {
      this.moneyPerDay = data;
    })
  }

  logOut(){
    localStorage.clear();
    this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
        root.popToRoot();
  }
}
