import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content} from 'ionic-angular';
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
  // @Input() data: any;
  @Input() events: any;
  @ViewChild(Content)
  content: Content;

  // animateItems = [];
  animateClass: any;
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
      this.animateClass = { 'fade-in-left-item': true };
    })
  }

  // onEvent(event: string, item: any, e: any) {
  //   if (this.events[event]) {
  //       this.events[event](item);
  //   }
  // }
//   ngOnChanges(changes: { [propKey: string]: any }) {
//     let that = this;
//     that.data = changes['data'].currentValue;
//     if (that.data && that.data.items) {
//         that.incomeList = [];
//         for (let i = 0; i < that.data.items.length; i++) {
//             setTimeout(function () {
//                 that.incomeList.push(that.data.items[i]);
//             }, 200 * i);
//         }

//     }
// }

}
