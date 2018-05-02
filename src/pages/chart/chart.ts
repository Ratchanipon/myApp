import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public num:number[]=[];
  // Doughnut
  public doughnutChartLabels:string[]=[];
  public doughnutChartData:number[]=[];
  public doughnutChartType:string = 'doughnut';

  dataChart:DataChart;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sumIncom: SumIncomeProvider,
              public sumFixedExp: SumFixedExpensesProvider,
              public sumDaily: SumDailyExpensesProvider,
              public dataChart_: DataChartProvider) {
                
                
                this.donutChart();
                
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ChartPage');
  this.donutChart();

}

donutChart(){

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
    console.log("income===",income);
    let fixed = JSON.parse(sessionStorage.getItem("fixed"));
    console.log("fixed===",fixed);
    let daily = JSON.parse(sessionStorage.getItem("daily"));
    console.log("daily===",daily);

    this.num.push(income,fixed,daily);
    console.log("num====",this.num);
    
    this.doughnutChartData = this.num ;
    this.doughnutChartLabels = ['รายรับ', 'รายจ่ายคงที่', 'รายจ่างรายวัน'];

    sessionStorage.removeItem('income');
    sessionStorage.removeItem('fixed');
    sessionStorage.removeItem('daily');
    
}
// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

}
