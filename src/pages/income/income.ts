import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncomeProvider } from '../../providers/income-services/income';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';

/**
 * Generated class for the IncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-income',
  templateUrl: 'income.html',
})
export class IncomePage {
  incomeList:any;
  sumIncome:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sumIncome_: SumIncomeProvider,
              public income: IncomeProvider) {

                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomePage');

    this.sumIncome_.getSumIncome().then(data => {
      this.sumIncome = data;
    })

    this.income.getIncome().then(data => {
      this.incomeList = data;
    })
  }

}
