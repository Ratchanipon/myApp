import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content, ActionSheet, ActionSheetController} from 'ionic-angular';
import { IncomeProvider } from '../../providers/income-services/income';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { Income } from '../../model/income';
import { Month } from '../../model/month';
import { IncomeByMonthProvider } from '../../providers/income-services/incomeByMonth';

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
  @Input() events: any;
  @ViewChild(Content)

  content: Content;
  incomeList:Income;
  sumIncome:any;

  month_now:string;
  month_select:string

  animateClass: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sumIncome_: SumIncomeProvider,
              public income: IncomeProvider,
              public actionSheetCtrl: ActionSheetController,
              public incomeByMonth: IncomeByMonthProvider) {

                
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomePage');
    this.animateClass = { 'fade-in-right-item': true };

    this.sumIncome_.getSumIncome().then(data => {
      this.sumIncome = data;
    })

    this.income.getIncome().then((data:Income) => {
      this.incomeList = data;
      console.log(this.incomeList.amount);
      
      
      if(this.incomeList.month = '1'){
        this.month_now = "มกราคม";
      }
      if(this.incomeList.month = '2'){
        this.month_now = "กุมภาพันธ์";
      }
      if(this.incomeList.month = '3'){
        this.month_now = "มีนาคม";
      }
    })
  }


  doMonth() {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'มกราคม',
          handler: () => {
            console.log('1');
            let month = 1;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "มกราคม";
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "กุมภาพันธ์";
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "มีนาคม";
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "เมษายน";
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "พฤษภาคม";
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "มิถุนายน";
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "กรกฎาคม";
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "สิงหาคม";
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "กันยายน";
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "ตุลาคม";
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "พฤศจิกายน";
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.incomeByMonth.getIncomeByMonth(month).then((data:Income) => {
              this.incomeList = data;
              this.month_now = "ธันวาคม";
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
