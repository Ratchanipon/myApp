import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { DataChartProvider } from '../../providers/calculate-services/get-dataChart';
import { DataChart } from '../../model/dataChart';
import { Income } from '../../model/income';
import { FixedExpenses } from '../../model/fixed-expenses';
import { DailyExpenses } from '../../model/add-daily-expenses';
import { SumIncome } from '../../model/get-sumIncome';
import { SumFixedExp } from '../../model/get-sumFixedExp';
import { SumDaileExp } from '../../model/get-sumDailyExp';
import { SumDispensableExpensesProvider } from '../../providers/summary-services/sum-dispensable-expenses';
import { SumNecessaryExpensesProvider } from '../../providers/summary-services/sum-necessary-expenses';
import { SumIncomeByMonthProvider } from '../../providers/calculate-services/sum-incomeByMonth';
import { SumFixedExpensesByMonthProvider } from '../../providers/calculate-services/sum-fixed-expensesByMonth';
import { SumDailyExpensesByMonthProvider } from '../../providers/calculate-services/sum-daily-expensesByMonth';
import { SumDispensableExpensesByMonthProvider } from '../../providers/summary-services/sum-dispensable-expensesByMonth';
import { SumNecessaryExpensesByMonthProvider } from '../../providers/summary-services/sum-necessary-expensesByMonth';
import { SumNecessaryExpensesLastMonthProvider } from '../../providers/summary-services/sum-necessary-expensesLastMonth';
import { SumDispensableExpensesLastMonthProvider } from '../../providers/summary-services/sum-dispensable-expensesLastMonth';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  year:string;
  month_now:string;

  disExp:number;

  // pieChart
  public num:number[]=[];
  public doughnutChartLabels = ['รายรับ', 'รายจ่ายคงที่', 'รายจ่ายรายวัน'];
  // public colorChart:string[] = ['#5cdd78','#5cdd78','#5cdd78'];
  public doughnutChartData:number[]=[];
  public doughnutChartType:string = 'pie';
  dataChart:DataChart;

  //barChart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels:string[] = ['เดือนที่แล้ว','เดือนนี้'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public num2:any[]=[];
  public barChartData:any[] = [{data:[], label:''},{data:[], label:''}];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public sumIncom: SumIncomeProvider,
              public sumIncomBymonth: SumIncomeByMonthProvider,
              public sumFixedExp: SumFixedExpensesProvider,
              public sumFixedExpBymonth: SumFixedExpensesByMonthProvider,
              public sumDaily: SumDailyExpensesProvider,
              public sumDailyByMonth: SumDailyExpensesByMonthProvider,
              public dataChart_: DataChartProvider,
              public sumDisExp: SumDispensableExpensesProvider,
              public sumDisExpByMonth: SumDispensableExpensesByMonthProvider,
              public sumDisExpLastMonth: SumDispensableExpensesLastMonthProvider,
              public sumNecExp: SumNecessaryExpensesProvider,
              public sumNecExpByMonth: SumNecessaryExpensesByMonthProvider,
              public sumNecExpLastMonth: SumNecessaryExpensesLastMonthProvider,
            ) {

              this.barChartData = [] ;

              this.doughnutChartData = [] ;
                if(1 == 1){
                  this.pieChart();
                  this.barChart();
                }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.pieChart();
      this.barChart();
      this.selectMonth();

      refresher.complete();
    }, 1000);
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ChartPage');

  this.barChartData = [] ;
  this.doughnutChartData = [] ;
  
  this.pieChart();
  this.barChart();

  this.selectMonth();
}

selectMonth(){
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

pieChart(){

  this.sumIncom.getSumIncome().then((data:SumIncome) => {          
    let income =JSON.stringify(data.totalIncome);
    sessionStorage.removeItem('income');
    sessionStorage.setItem("income",income);                
  })
  this.sumFixedExp.getSumFixedExpenses().then((data:SumFixedExp) => {   
    let fixed =JSON.stringify(data.totalFixedExp);
    sessionStorage.removeItem('fixed');
    sessionStorage.setItem("fixed",fixed);
  })
  this.sumDaily.getSumDailyExpenses().then((data:SumDaileExp) => {  
    let daily =JSON.stringify(data.totalDailyExp);
    sessionStorage.removeItem('daily');
    sessionStorage.setItem("daily",daily);
  })

    let income = JSON.parse(sessionStorage.getItem("income"));
    let fixed = JSON.parse(sessionStorage.getItem("fixed"));
    let daily = JSON.parse(sessionStorage.getItem("daily"));

    this.num.push(income,fixed,daily);
    this.doughnutChartData = this.num ;
    
}

barChart(){

  //เดือนปัจจุบัน
  this.sumNecExp.getSumNecessaryExpenses().then((data:any) => {
    let totalNecExp = JSON.stringify(data.total);
    // sessionStorage.removeItem('totalNecExp');
    sessionStorage.setItem("totalNecExp",totalNecExp);   
  })
  this.sumDisExp.getSumDispensableExpenses().then((data:any) => {
    let totalDisExp =JSON.stringify(data.total);
    // sessionStorage.removeItem('totalDisExp');
    sessionStorage.setItem("totalDisExp",totalDisExp);
  })

  //เดือนที่แล้ว
  this.sumNecExpLastMonth.getSumNecessaryExpensessLastMonth().then((data:any) => {
    let totalNecExp = JSON.stringify(data.total);
    sessionStorage.setItem("totalNecExpLastMonth",totalNecExp);   
    
  })
  this.sumDisExpLastMonth.getSumDispensableExpensessLastMonth().then((data:any) => {
    let totalDisExp =JSON.stringify(data.total);
    sessionStorage.setItem("totalDisExpLastMonth",totalDisExp);
  })

  let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
  this.disExp = JSON.parse(sessionStorage.getItem("totalDisExp"));

  let totalNecExpLastMonth = JSON.parse(sessionStorage.getItem("totalNecExpLastMonth"));
  let totalDisExpLastMonth = JSON.parse(sessionStorage.getItem("totalDisExpLastMonth"));

  this.num2.push({data:[totalNecExpLastMonth,totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExpLastMonth,this.disExp],label:'รายจายที่ไม่จำเป็น'});
  this.barChartData = this.num2 ;
  sessionStorage.removeItem("totalNecExp");
  sessionStorage.removeItem("totalDisExp");
  sessionStorage.removeItem("totalNecExpLastMonth");
  sessionStorage.removeItem("totalDisExpLastMonth");
}


// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

doMonth() {
  let actionSheet = this.actionSheetCtrl.create({
    
    buttons: [
      {
        text: 'มกราคม',
        handler: () => {
          console.log('1');
          let month = 1;
          this.month_now = "มกราคม";

          //pieChartl
            this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
              let income =JSON.stringify(data.totalIncome);
              sessionStorage.removeItem('income');
              sessionStorage.setItem("income",income);                
            })
            this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
              let fixed =JSON.stringify(data.totalFixedExp);
              sessionStorage.removeItem('fixed');
              sessionStorage.setItem("fixed",fixed);
            })
            this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
              let daily =JSON.stringify(data.totalDailyExp);
              sessionStorage.removeItem('daily');
              sessionStorage.setItem("daily",daily);
            })
              let income = JSON.parse(sessionStorage.getItem("income"));
              let fixed = JSON.parse(sessionStorage.getItem("fixed"));
              let daily = JSON.parse(sessionStorage.getItem("daily"));
              this.num.push(income,fixed,daily);
              this.doughnutChartData = this.num ;

          //barChart
            this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
              let totalNecExp = JSON.stringify(data.total);
              sessionStorage.removeItem('totalNecExp');
              sessionStorage.setItem("totalNecExp",totalNecExp);
            })
            this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
              let totalDisExp =JSON.stringify(data.total);
              sessionStorage.removeItem('totalDisExp');
              sessionStorage.setItem("totalDisExp",totalDisExp);
            })
            let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
            let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
            this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
            this.barChartData = this.num2 ;
        }
      },
      {
        text: 'กุมภาพันธ์',
        handler: () => {
          console.log('2');
          let month = 2;
          this.month_now = "กุมภาพันธ์";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'มีนาคม',
        handler: () => {
          console.log('3');
          let month = 3;
          this.month_now = "มีนาคม";
         //pieChart
         this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
          let income =JSON.stringify(data.totalIncome);
          sessionStorage.removeItem('income');
          sessionStorage.setItem("income",income);  
          console.log("income-------",income);
                        
        })
        this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
          let fixed =JSON.stringify(data.totalFixedExp);
          sessionStorage.removeItem('fixed');
          sessionStorage.setItem("fixed",fixed);
        })
        this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
          let daily =JSON.stringify(data.totalDailyExp);
          sessionStorage.removeItem('daily');
          sessionStorage.setItem("daily",daily);
        })
          let income = JSON.parse(sessionStorage.getItem("income"));
          let fixed = JSON.parse(sessionStorage.getItem("fixed"));
          let daily = JSON.parse(sessionStorage.getItem("daily"));
          this.num.push(income,fixed,daily);
          this.doughnutChartData = this.num ;

      //barChart
        this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
          let totalNecExp = JSON.stringify(data.total);
          sessionStorage.removeItem('totalNecExp');
          sessionStorage.setItem("totalNecExp",totalNecExp);
        })
        this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
          let totalDisExp =JSON.stringify(data.total);
          sessionStorage.removeItem('totalDisExp');
          sessionStorage.setItem("totalDisExp",totalDisExp);
        })
        let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
        let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
        this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
        this.barChartData = this.num2 ;
        }
      },
      {
        text: 'เมษายน',
        handler: () => {
          console.log('4');
          let month = 4;
          this.month_now = "เมษายน";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);     
            console.log("income-------",income);           
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'พฤษภาคม',
        handler: () => {
          console.log('5');
          let month = 5;
          this.month_now = "พฤษภาคม";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'มิถุนายน',
        handler: () => {
          console.log('6');
          let month = 6;
          this.month_now = "มิถุนายน";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'กรกฎาคม',
        handler: () => {
          console.log('7');
          let month = 7;
          this.month_now = "กรกฎาคม";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'สิงหาคม',
        handler: () => {
          console.log('8');
          let month = 8;
          this.month_now = "สิงหาคม";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'กันยายน',
        handler: () => {
          console.log('9');
          let month = 9;
          this.month_now = "กันยายน";
         //pieChart
         this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
          let income =JSON.stringify(data.totalIncome);
          sessionStorage.removeItem('income');
          sessionStorage.setItem("income",income);                
        })
        this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
          let fixed =JSON.stringify(data.totalFixedExp);
          sessionStorage.removeItem('fixed');
          sessionStorage.setItem("fixed",fixed);
        })
        this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
          let daily =JSON.stringify(data.totalDailyExp);
          sessionStorage.removeItem('daily');
          sessionStorage.setItem("daily",daily);
        })
          let income = JSON.parse(sessionStorage.getItem("income"));
          let fixed = JSON.parse(sessionStorage.getItem("fixed"));
          let daily = JSON.parse(sessionStorage.getItem("daily"));
          this.num.push(income,fixed,daily);
          this.doughnutChartData = this.num ;

      //barChart
        this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
          let totalNecExp = JSON.stringify(data.total);
          sessionStorage.removeItem('totalNecExp');
          sessionStorage.setItem("totalNecExp",totalNecExp);
        })
        this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
          let totalDisExp =JSON.stringify(data.total);
          sessionStorage.removeItem('totalDisExp');
          sessionStorage.setItem("totalDisExp",totalDisExp);
        })
        let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
        let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
        this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
        this.barChartData = this.num2 ;
        }
      },
      {
        text: 'ตุลาคม',
        handler: () => {
          console.log('10');
          let month = 10;
          this.month_now = "ตุลาคม";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'พฤศจิกายน',
        handler: () => {
          console.log('11');
          let month = 11;
          this.month_now = "พฤศจิกายน";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
        }
      },
      {
        text: 'ธันวาคม',
        handler: () => {
          console.log('12');
          let month = 12;
          this.month_now = "ธันวาคม";
          //pieChart
          this.sumIncomBymonth.getSumIncomeByMonth(month).then((data:SumIncome) => {          
            let income =JSON.stringify(data.totalIncome);
            sessionStorage.removeItem('income');
            sessionStorage.setItem("income",income);                
          })
          this.sumFixedExpBymonth.getSumFixedExpensesByMonth(month).then((data:SumFixedExp) => {   
            let fixed =JSON.stringify(data.totalFixedExp);
            sessionStorage.removeItem('fixed');
            sessionStorage.setItem("fixed",fixed);
          })
          this.sumDailyByMonth.getSumDailyExpensesByMonth(month).then((data:SumDaileExp) => {  
            let daily =JSON.stringify(data.totalDailyExp);
            sessionStorage.removeItem('daily');
            sessionStorage.setItem("daily",daily);
          })
            let income = JSON.parse(sessionStorage.getItem("income"));
            let fixed = JSON.parse(sessionStorage.getItem("fixed"));
            let daily = JSON.parse(sessionStorage.getItem("daily"));
            this.num.push(income,fixed,daily);
            this.doughnutChartData = this.num ;

        //barChart
          this.sumNecExpByMonth.getSumNecessaryExpensesByMonth(month).then((data:any) => {
            let totalNecExp = JSON.stringify(data.total);
            sessionStorage.removeItem('totalNecExp');
            sessionStorage.setItem("totalNecExp",totalNecExp);
          })
          this.sumDisExpByMonth.getSumDispensableExpensesByMonth(month).then((data:any) => {
            let totalDisExp =JSON.stringify(data.total);
            sessionStorage.removeItem('totalDisExp');
            sessionStorage.setItem("totalDisExp",totalDisExp);
          })
          let totalNecExp = JSON.parse(sessionStorage.getItem("totalNecExp"));
          let totalDisExp = JSON.parse(sessionStorage.getItem("totalDisExp"));
          this.num2.push({data:[totalNecExp],label:'รายจายที่จำเป็น'},{ data:[totalDisExp],label:'รายจายที่ไม่จำเป็น'});
          this.barChartData = this.num2 ;
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
