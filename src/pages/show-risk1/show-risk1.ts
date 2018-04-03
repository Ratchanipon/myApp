import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Risk1Provider } from '../../providers/risk-services/risk1';

/**
 * Generated class for the ShowRisk1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-risk1',
  templateUrl: 'show-risk1.html',
})
export class ShowRisk1Page {
  DTI:number;
  risk:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public risk_: Risk1Provider,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRisk1Page');

    this.DTI = this.navParams.get("DTI");
    console.log(this.DTI);

    if(this.DTI <= 40){
      this.risk_.getRisk1().then(data => {
        this.risk = data;
        console.log(this.risk);
        
      })
    }
    else if(this.DTI <= 50){
      this.risk_.getRisk2().then(data => {
        this.risk = data;
        console.log(this.risk);
        
      })
    }
    else if(this.DTI <= 70){
      this.risk_.getRisk3().then(data => {
        this.risk = data;
        console.log(this.risk);
        
      })
    }
    else{
      this.risk_.getRisk4().then(data => {
        this.risk = data;
        console.log(this.risk);
        
      })
    }
    
  }

}
