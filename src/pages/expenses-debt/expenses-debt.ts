import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ExpensesDebtProvider } from '../../providers/summary-services/expenses-debt';
import { ExpensesDebtByMonthProvider } from '../../providers/summary-services/expenses-debtByMonth';

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
  year:string;

  month_now:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public expensesDebt: ExpensesDebtProvider,
              public expensesDebtByMonth: ExpensesDebtByMonthProvider) {

                this.expensesDebt.getExpensesDebt().then(data => {
                  this.expensesDebtList = data;
                })
              
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.expensesDebt.getExpensesDebt().then(data => {
        this.expensesDebtList = data;
      })
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
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesDebtPage');
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

  doMonth() {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'มกราคม',
          handler: () => {
            console.log('1');
            let month = 1;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "มกราคม";
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "กุมภาพันธ์";
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "มีนาคม";
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "เมษายน";
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "พฤษภาคม";
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "มิถุนายน";
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "กรกฎาคม";
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "สิงหาคม";
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "กันยายน";
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "ตุลาคม";
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
              this.month_now = "พฤศจิกายน";
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.expensesDebtByMonth.getExpensesDebtByMonth(month).then(data => {
              this.expensesDebtList = data;
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


}
