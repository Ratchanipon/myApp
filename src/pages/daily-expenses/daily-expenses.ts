import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, App } from 'ionic-angular';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { DailyExpensesProvider } from '../../providers/daily-expenses-services/daily-expenses';
import { SumDailyExpensesByMonthProvider } from '../../providers/calculate-services/sum-daily-expensesByMonth';
import { DailyExpensesByMonthProvider } from '../../providers/daily-expenses-services/daily-expensesByMonth';
import { SumDaileExp } from '../../model/get-sumDailyExp';
import { ToastProvider } from '../../providers/toast/toast';
import { DeleteDailyExpensesProvider } from '../../providers/daily-expenses-services/delete-daily_expenses';

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
  sumDailyExpenses:SumDaileExp;
  sumDailyExpenses1:number;
  dailyExpensesList:any;

  animateClass:any;
  year:string;

  month_now:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toast: ToastProvider,
              public app: App,
              public actionSheetCtrl: ActionSheetController,
              public sumDailyExpenses_: SumDailyExpensesProvider,
              public sumDailyExpensesByMonth: SumDailyExpensesByMonthProvider,
              public dailyExpenses_: DailyExpensesProvider,
              public dailyExpensesByMonth: DailyExpensesByMonthProvider,
              public deleteDailyExp: DeleteDailyExpensesProvider) {

                this.sumDailyExpenses_.getSumDailyExpenses().then((data:SumDaileExp) => {
                  this.sumDailyExpenses = data;
                  this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
                })
            
                this.dailyExpenses_.getDailyExpenses().then(data => {
                  this.dailyExpensesList = data;
                })

                
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.sumDailyExpenses_.getSumDailyExpenses().then((data:SumDaileExp) => {
        this.sumDailyExpenses = data;
        this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
      })
  
      this.dailyExpenses_.getDailyExpenses().then(data => {
        this.dailyExpensesList = data;
      })
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
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyExpensesPage');
    this.animateClass = { 'fade-in-right-item': true };

    this.sumDailyExpenses_.getSumDailyExpenses().then((data:SumDaileExp) => {
      this.sumDailyExpenses = data;
      this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
    })

    this.dailyExpenses_.getDailyExpenses().then(data => {
      this.dailyExpensesList = data;
    })

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

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "มกราคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "กุมภาพันธ์";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "มีนาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "เมษายน";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "พฤษภาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "มิถุนายน";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "กรกฎาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "สิงหาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "กันยายน";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "ตุลาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "พฤศจิกายน";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.dailyExpensesByMonth.getDailyExpensesByMonth(month).then(data => {
              this.dailyExpensesList = data;
              this.month_now = "ธันวาคม";
            })
            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.sumDailyExpenses = data;
              this.sumDailyExpenses1 = this.sumDailyExpenses.totalDailyExp;
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

  editDailyExpenses(item) {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          icon: 'eye',
          text: 'รายละเอียด',
          handler: () => {
            this.navCtrl.push('DetailDailyExpensesPage',item)
          }
        },
        {
          icon: 'create',
          text: 'แก้ไข',
          handler: () => {
            this.navCtrl.push('EditDailyExpensesPage',item)
          }
        },
        {
          icon: 'trash',
          text: 'ลบ',
          handler: () => {
            let daily_expenses_id = item.daily_expenses_id;
            this.DeleteConfirm(daily_expenses_id);
          }
        },
        {
          icon: 'close-circle',
          text: 'ยกเลิก',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  DeleteConfirm(daily_expenses_id) {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการจะลบรายจ่ายรายวันนี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.deleteDailyExp.DeleteDailyExpenses(daily_expenses_id);
            this.toast.ToastService('ลบรายการสำเร็จ');
            this.navCtrl.setRoot('DailyExpensesPage');   
            const root = this.app.getRootNav();
            root.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

}
