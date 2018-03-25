import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomeDebtProvider } from '../../providers/summary-services/income-debt';

/**
 * Generated class for the IncomeDebtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-income-debt',
  templateUrl: 'income-debt.html',
})
export class IncomeDebtPage {
  incomeDebtList:any;

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public incomeDebt: IncomeDebtProvider) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomeDebtPage');
    this.animateClass = { 'fade-in-right-item': true };


    this.incomeDebt.getIncomeDebt().then(data => {
      this.incomeDebtList = data;
    })
  }

}
