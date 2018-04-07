import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MaxExpensesProvider } from '../../providers/summary-services/max-expenses';
import { MaxExpensesByMonthProvider } from '../../providers/summary-services/max-expensesByMonth';

/**
 * Generated class for the MaxExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-max-expenses',
  templateUrl: 'max-expenses.html',
})
export class MaxExpensesPage {
  maxExpenses:any;

  animateClass:any;
  year:string;


  month_now:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public maxExp: MaxExpensesProvider,
              public maxExpByMonth: MaxExpensesByMonthProvider) {

                this.maxExp.getMaxExpenses().then(data => {
                  this.maxExpenses = data;
                  console.log(this.maxExpenses);
                  
                })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.maxExp.getMaxExpenses().then(data => {
        this.maxExpenses = data;
        console.log(this.maxExpenses);
        
      })
      refresher.complete();
    }, 1500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaxExpensesPage');
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

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "มกราคม";
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "กุมภาพันธ์";
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "มีนาคม";
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "เมษายน";
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "พฤษภาคม";
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "มิถุนายน";
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "กรกฎาคม";
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "สิงหาคม";
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "กันยายน";
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "ตุลาคม";
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
              this.month_now = "พฤศจิกายน";
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.maxExpByMonth.getMaxExpensesByMonth(month).then(data => {
              this.maxExpenses = data;
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
