import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { DataChartProvider } from '../../providers/calculate-services/get-dataChart';
import { DataChart } from '../../model/dataChart';

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

  income:number;
  dailyExp:number;
  fixedExp:number;

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

                this.sumIncom.getSumIncome().then((data:number) => {          
                  this.income = data;                  
                })
                this.sumFixedExp.getSumFixedExpenses().then((data:number) => {   
                  this.fixedExp = data;
                })
                this.sumDaily.getSumDailyExpenses().then((data:number) => {  
                  this.dailyExp = data;
                })

                this.income = 10
                this.fixedExp = 2;
                this.dailyExp = 3;
                
                this.num.push(this.income,this.fixedExp,this.dailyExp);
                console.log('num==',this.num);
                
                
                this.doughnutChartLabels = ['รายรับ', 'รายจ่ายคงที่', 'รายจ่างรายวัน'];
                
                console.log('num',this.doughnutChartData);
                
                
                
                
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ChartPage');

  
}
// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

}
