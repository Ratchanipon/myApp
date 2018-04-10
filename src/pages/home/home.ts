import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController } from 'ionic-angular';
import { BalancedProvider } from '../../providers/calculate-services/balance';
import { User } from '../../model/user';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { MoneyPerDayProvider } from '../../providers/calculate-services/sum-money-perday';
import { SumIncomeByMonthProvider } from '../../providers/calculate-services/sum-incomeByMonth';
import { SumDailyExpensesByMonthProvider } from '../../providers/calculate-services/sum-daily-expensesByMonth';
import { SumFixedExpensesByMonthProvider } from '../../providers/calculate-services/sum-fixed-expensesByMonth';
import { BalancedByMonthProvider } from '../../providers/calculate-services/balanceByMonth';
import { MoneyPerDayByMonthProvider } from '../../providers/calculate-services/sum-money-perdayByMonth';
import { SumDaileExp } from '../../model/get-sumDailyExp';
import { SumIncome } from '../../model/get-sumIncome';
import { SumFixedExp } from '../../model/get-sumFixedExp';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user:User;
  totalIncome:SumIncome;
  totalIncome1:number;
  totalFixedExp:SumFixedExp;
  totalFixedExp1:number;
  totalDailyExp:SumDaileExp;
  totalDailyExp1:number;
  moneyPerDay:number;
  balance:number;
  year:string;
  animateClass:any;

  month_now:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sumIncome: SumIncomeProvider,
              public sumIncomeByMonth: SumIncomeByMonthProvider,
              public sumDailyExpenses: SumDailyExpensesProvider,
              public sumDailyExpensesByMonth: SumDailyExpensesByMonthProvider,
              public sumFixedExpenses: SumFixedExpensesProvider,
              public sumFixedExpensesByMonth: SumFixedExpensesByMonthProvider,
              public actionSheetCtrl: ActionSheetController,
              public moneyPerDay_: MoneyPerDayProvider,
              public moneyPerDayByMonth: MoneyPerDayByMonthProvider,
              public balanced: BalancedProvider,
              public balancedByMonth: BalancedByMonthProvider,
              private app:App
            ) {

              this.user = this.navParams.get('user');
                console.info('user'+this.user);

    this.sumIncome.getSumIncome().then((data:SumIncome) => {
      this.totalIncome = data;
      this.totalIncome1 = this.totalIncome.totalIncome;
    })

    this.sumFixedExpenses.getSumFixedExpenses().then((data:SumFixedExp) => {
      this.totalFixedExp = data;
      this.totalFixedExp1 = this.totalFixedExp.totalFixedExp
    })

    this.sumDailyExpenses.getSumDailyExpenses().then((data:SumDaileExp) => {
      this.totalDailyExp = data;
      this.totalDailyExp1 = this.totalDailyExp.totalDailyExp;
    })

    // this.moneyPerDay_.getMoneyPerDay().then((data:number) => {
    //   this.moneyPerDay = data;
    // })

    // this.balanced.getBalanced().then((data:number) => {
    //   console.info(data);
    //   this.balance = data;
    // })

              
         
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.user = this.navParams.get('user');
                console.info('user'+this.user);

    this.sumIncome.getSumIncome().then((data:SumIncome) => {
      this.totalIncome = data;
      this.totalIncome1 = this.totalIncome.totalIncome;
    })

    this.sumFixedExpenses.getSumFixedExpenses().then((data:SumFixedExp) => {
      this.totalFixedExp = data;
      this.totalFixedExp1 = this.totalFixedExp.totalFixedExp
    })

    this.sumDailyExpenses.getSumDailyExpenses().then((data:SumDaileExp) => {
      this.totalDailyExp = data;
      this.totalDailyExp1 = this.totalDailyExp.totalDailyExp;
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
    
    

    // this.showChart();
  }

  // showChart(){
  //   //chart
  //   let inc = this.balance;
  //   console.info("xvxcvx==========="+this.balance);
  //   var data = google.visualization.arrayToDataTable([
  //     ['Task', 'Hours per Day'],
  //     ['รายรับ',     2000],
  //     ['รายจ่ายคงที่',      600],
  //     ['รายจ่ายรายวัน',  100]
  //   ]);

  //   var options = {
  //     title: 'งบการเงินส่วนบุคคล',
  //     pieHole: 1.4,
  //   };
  //   var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  //   chart.draw(data, options);
  // }



  doMonth() {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'มกราคม',
          handler: () => {
            console.log('1');
            let month = 1;
            this.month_now = "มกราคม";

            this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
              this.totalIncome = data;
            })

            this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
              this.totalFixedExp = data;
            })

            this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
              this.totalDailyExp = data;

            })

            this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
              this.moneyPerDay = data;
            })

            this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
              this.balance = data; 
            })

          }
        },
        {
          text: 'กุมภาพันธ์',
          handler: () => {
            console.log('2');
            let month = 2;
              this.month_now = "กุมภาพันธ์";

              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })
              
              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'มีนาคม',
          handler: () => {
            console.log('3');
            let month = 3;
              this.month_now = "มีนาคม";

              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'เมษายน',
          handler: () => {
            console.log('4');
            let month = 4;
              this.month_now = "เมษายน";
  
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'พฤษภาคม',
          handler: () => {
            console.log('5');
            let month = 5;
              this.month_now = "พฤษภาคม";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'มิถุนายน',
          handler: () => {
            console.log('6');
            let month = 6;
              this.month_now = "มิถุนายน";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'กรกฎาคม',
          handler: () => {
            console.log('7');
            let month = 7;
              this.month_now = "กรกฎาคม";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'สิงหาคม',
          handler: () => {
            console.log('8');
            let month = 8;
              this.month_now = "สิงหาคม";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'กันยายน',
          handler: () => {
            console.log('9');
            let month = 9;
              this.month_now = "กันยายน";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'ตุลาคม',
          handler: () => {
            console.log('10');
            let month = 10;
              this.month_now = "ตุลาคม";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'พฤศจิกายน',
          handler: () => {
            console.log('11');
            let month = 11;
              this.month_now = "พฤศจิกายน";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
              })
          }
        },
        {
          text: 'ธันวาคม',
          handler: () => {
            console.log('12');
            let month = 12;
              this.month_now = "ธันวาคม";
            
              this.sumIncomeByMonth.getSumIncomeByMonth(month).then((data:SumIncome) => {
                this.totalIncome = data;
              })
  
              this.sumFixedExpensesByMonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {
                this.totalFixedExp = data;
              })
  
              this.sumDailyExpensesByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {
                this.totalDailyExp = data;
              })

              this.moneyPerDayByMonth.getMoneyPerDayByMonth(month).then((data:number) => {
                this.moneyPerDay = data;
              })
  
              this.balancedByMonth.getBalancedByMonth(month).then((data:number) => {
                this.balance = data; 
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

  logOut(){
    localStorage.clear();
    this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
        root.popToRoot();
  }
}
