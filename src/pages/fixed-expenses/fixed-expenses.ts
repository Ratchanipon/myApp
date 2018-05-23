import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, App } from 'ionic-angular';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { FixedExpensesProvider } from '../../providers/fixed-expenses-services/fixed-expenses';
import { SumFixedExpensesByMonthProvider } from '../../providers/calculate-services/sum-fixed-expensesByMonth';
import { FixedExpensesByMonthProvider } from '../../providers/fixed-expenses-services/fixed-expensesByMonth';
import { SumFixedExp } from '../../model/get-sumFixedExp';
import { ToastProvider } from '../../providers/toast/toast';
import { DeleteFixedExpensesProvider } from '../../providers/fixed-expenses-services/delete-fixed_expenses';

/**
 * Generated class for the FixedExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fixed-expenses',
  templateUrl: 'fixed-expenses.html',
})
export class FixedExpensesPage {
  sumFixedExpenses:SumFixedExp;
  sumFixedExpenses1:number;
  fixedExpensesList:any;
  year:string;

  animateClass:any;

  month_now:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public actionSheetCtrl: ActionSheetController,
              public sumFixedExpenses_: SumFixedExpensesProvider,
              public sumFixedExpensesByMonth: SumFixedExpensesByMonthProvider,
              public fixedExpenses_: FixedExpensesProvider,
              public fixExpByMonth: FixedExpensesByMonthProvider,
              public toast: ToastProvider,
              public alertCtrl: AlertController,
              public deleteFixExp: DeleteFixedExpensesProvider
            ) {

                this.sumFixedExpenses_.getSumFixedExpenses().then((data:SumFixedExp) => {
                  console.info("sumFixedExp=="+data);
                  this.sumFixedExpenses = data;
                  this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
                  
                })
            
                this.fixedExpenses_.getFixedExpenses().then(data => {
                  this.fixedExpensesList = data;
                  console.log(this.fixedExpensesList);
                  
                })
              }
                doRefresh(refresher) {
                  console.log('Begin async operation', refresher);
              
                  setTimeout(() => {
                    console.log('Async operation has ended');
                    this.sumFixedExpenses_.getSumFixedExpenses().then((data:SumFixedExp) => {
                      console.info("sumFixedExp=="+data);
                      this.sumFixedExpenses = data;
                      this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
                      
                    })
                
                    this.fixedExpenses_.getFixedExpenses().then(data => {
                      this.fixedExpensesList = data;
                      console.log(this.fixedExpensesList);
                      
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
                  }, 1500);
                

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FixedExpensesPage');
    this.animateClass = { 'fade-in-right-item': true };

    this.sumFixedExpenses_.getSumFixedExpenses().then((data:SumFixedExp) => {
      console.info("sumFixedExp=="+data);
      this.sumFixedExpenses = data;
      this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
      
    })

    this.fixedExpenses_.getFixedExpenses().then(data => {
      this.fixedExpensesList = data;
      console.log(this.fixedExpensesList);
      
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

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "มกราคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "กุมภาพันธ์";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "มีนาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "เมษายน";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "พฤษภาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "มิถุนายน";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "กรกฎาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "สิงหาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "กันยายน";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "ตุลาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "พฤศจิกายน";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
            })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;

            this.fixExpByMonth.getFixedExpensesByMonth(month).then(data => {
              this.fixedExpensesList = data;
              this.month_now = "ธันวาคม";
            })
            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.sumFixedExpenses = data;
              this.sumFixedExpenses1 = this.sumFixedExpenses.totalFixedExp;
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

  editFixedExpenses(item) {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          icon: 'eye',
          text: 'รายละเอียด',
          handler: () => {
            this.navCtrl.push('DetailFixedExpensesPage',item)
          }
        },
        {
          icon: 'create',
          text: 'แก้ไข',
          handler: () => {
            console.log(item.category);
            this.navCtrl.push('EditFixedExpensesPage',item)
          }
        },
        {
          icon: 'trash',
          text: 'ลบ',
          handler: () => {
            let fix_expenses_id = item.fix_expenses_id;
            this.DeleteConfirm(fix_expenses_id);
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

  DeleteConfirm(fix_expenses_id) {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการจะลบรายจ่ายคงที่นี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.deleteFixExp.DeleteFixedExpenses(fix_expenses_id);
            this.toast.ToastService('ลบรายการสำเร็จ');
            this.navCtrl.setRoot('FixedExpensesPage');   
            const root = this.app.getRootNav();
            root.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

}
