import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DispensableExpensesProvider } from '../../providers/summary-services/dispensable-expenses';
import { Storage } from '@ionic/storage';
import { DispensableExpensesByMonthProvider } from '../../providers/summary-services/dispensable-expensesByMonth';
import { SumDispensableExpensesByMonthProvider } from '../../providers/summary-services/sum-dispensable-expensesByMonth';
import { SumDispensableExpensesProvider } from '../../providers/summary-services/sum-dispensable-expenses';


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
  sumDispensableExp:any;
  animateClass:any;
  year:string;

  month_now:string
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public dispensableExpenses: DispensableExpensesProvider,
              public dispensableExpensesByMonth: DispensableExpensesByMonthProvider,
              public sumDispensableExpenses: SumDispensableExpensesProvider,
              public sumDispensableExpensesByMonth: SumDispensableExpensesByMonthProvider,
              private storage: Storage) {

                this.dispensableExpenses.getDispensableExpenses()
                .then((data: any) => {
                  this.dispensableExpList = data;
                }).catch(err => {
                  console.error(err);
      
                })
                this.sumDispensableExpenses.getSumDispensableExpenses().then(data => {
                this.sumDispensableExp = data;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.animateClass = { 'fade-in-right-item': true };
    this.year = sessionStorage.getItem("year");

    //เดือนปัจจุบัน
    let month_n = parseInt(sessionStorage.getItem("month"));
    let month = month_n+1;
    console.info('month='+month);
    if(month == 1){
      this.month_now = "มกราคม";
    }
    if(month == 2){
      this.month_now = "กุมภาพันธ์";
    }
    if(month == 3){
      this.month_now = "มีนาคม";
    }
    if(month == 4){
      this.month_now = "เมษายน";
    }
    if(month == 5){
      this.month_now = "พฤษภาคม";
    }
    if(month == 6){
      this.month_now = "มิถุนายน";
    }
    if(month == 7){
      this.month_now = "กรกฎาคม";
    }
    if(month == 8){
      this.month_now = "สิงหาคม";
    }
    if(month == 9){
      this.month_now = "กันยายน";
    }
    if(month == 10){
      this.month_now = "ตุลาคม";
    }
    if(month == 11){
      this.month_now = "พฤศจิกายน";
    }
    if(month == 12){
      this.month_now = "ธันวาคม";
    }

    
    
   }
   disExpensesDetail(item){
    // alert(item.channelExp);
    this.navCtrl.push("DispensableExpensesDetailPage",item);
   }

   doMonth() {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'มกราคม',
          handler: () => {
            console.log('1');
            let month = 1;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "มกราคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "กุมภาพันธ์";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "มีนาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "เมษายน";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "พฤษภาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "มิถุนายน";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "กรกฎาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "สิงหาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "กันยายน";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "ตุลาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "พฤศจิกายน";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.dispensableExpensesByMonth.getDispensableExpensesByMonth(month).then(data => {
              this.dispensableExpList = data;
              this.month_now = "ธันวาคม";
            })
            this.sumDispensableExpensesByMonth.getSumDispensableExpensesByMonth(month).then(data => {
              this.sumDispensableExp = data;
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

}
