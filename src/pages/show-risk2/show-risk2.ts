import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumIncome } from '../../model/get-sumIncome';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumFixedExp } from '../../model/get-sumFixedExp';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { SumDaileExp } from '../../model/get-sumDailyExp';
import { Risk1Provider } from '../../providers/risk-services/risk1';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ShowRisk2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-risk2',
  templateUrl: 'show-risk2.html',
})
export class ShowRisk2Page {

  risk:any;

  risk2:string;

  DTI:number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App,
              public loading: LoadingProvider,
              public risk_: Risk1Provider,
              public sumIncome_: SumIncomeProvider,
              public sumFixed_: SumFixedExpensesProvider,
              public sumDaily_: SumDailyExpensesProvider) {


                this.sumIncome_.getSumIncome().then((data:SumIncome) => {            
                  let income = data.totalIncome;
                  this.sumFixed_.getSumFixedExpenses().then((data:SumFixedExp) => {            
                    let fixExp = data.totalFixedExp;
                    this.sumDaily_.getSumDailyExpenses().then((data:SumDaileExp) => {
                      let dailyExp = data.totalDailyExp;
                      this.cal(income,fixExp,dailyExp);
                    })
                  })
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRisk2Page');

  }


  async cal(income, fixExp, dailyExp){

    this.loading.cal();

    let exp = fixExp*1+dailyExp*1;
    let DTI = (exp/income)*100;

    this.DTI = DTI;
    if(DTI <= 40){
      this.risk_.getRisk1().then(data => {
        this.risk = data;
        console.log(this.risk);
        this.risk2 = "ไม่เสี่ยง"
      })
    }
    else if(DTI <= 50){
      this.risk_.getRisk2().then(data => {
        this.risk = data;
        console.log(this.risk);
        this.risk2 = "ปานกลาง"
      })
    }
    else if(DTI <= 70){
      this.risk_.getRisk3().then(data => {
        this.risk = data;
        console.log(this.risk);
        this.risk2 = "เสี่ยง"
      })
    }
    else{
      this.risk_.getRisk4().then(data => {
        this.risk = data;
        console.log(this.risk);
        this.risk2 = "เสี่ยงมาก"
      })
    }
    
  }

  HomePage(){
    this.navCtrl.setRoot('HomePage');   
        const root = this.app.getRootNav();
        root.popToRoot();
  }

}
