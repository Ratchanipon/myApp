import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FhcInstant } from '../../model/Fhc-instant';

/**
 * Generated class for the FhcInstantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fhc-instant',
  templateUrl: 'fhc-instant.html',
})
export class FhcInstantPage {
  check: string;
  fhcInstant:FhcInstant;

  incomeTotal:number;
  expTotal:number;
  DTI:number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,) {

    this.fhcInstant = {income11:null,income12:null,income13:null,income21:null,income22:null,income23:null,income24:null,income25:null,
                       exp11:null,exp12:null,exp13:null,exp14:null,exp15:null,exp16:null,exp17:null,exp18:null,exp21:null,exp22:null,exp23:null,exp24:null,exp25:null,exp26:null,exp27:null,exp28:null}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FhcInstantPage');
  }

  doFhcInstant(fhcInstant:FhcInstant){

    if(this.fhcInstant.income11!=null){
      console.error(this.fhcInstant);

      let income11:number = this.fhcInstant.income11;
      let income12:number = this.fhcInstant.income12;
      let income13:number = this.fhcInstant.income13;
      let income21:number = this.fhcInstant.income21;
      let income22:number = this.fhcInstant.income22;
      let income23:number = this.fhcInstant.income23;
      let income24:number = this.fhcInstant.income24;
      let income25:number = this.fhcInstant.income25;

      let exp11:number = this.fhcInstant.exp11;
      let exp12:number = this.fhcInstant.exp12;
      let exp13:number = this.fhcInstant.exp13;
      let exp14:number = this.fhcInstant.exp14;
      let exp15:number = this.fhcInstant.exp15;
      let exp16:number = this.fhcInstant.exp16;
      let exp17:number = this.fhcInstant.exp17;
      let exp18:number = this.fhcInstant.exp18;

      let exp21:number = this.fhcInstant.exp21;
      let exp22:number = this.fhcInstant.exp22;
      let exp23:number = this.fhcInstant.exp23;
      let exp24:number = this.fhcInstant.exp24;
      let exp25:number = this.fhcInstant.exp25;
      let exp26:number = this.fhcInstant.exp26;
      let exp27:number = this.fhcInstant.exp27;
      let exp28:number = this.fhcInstant.exp28;

      this.incomeTotal = (((income11*1)+(income12*1)+(income13*1))*12)+
                         ((income21*1)+(income22*1)+(income23*1)+(income24*1)+(income25*1));
      let incomeTotal = this.incomeTotal;
      
      this.expTotal = (((exp11*1)+(exp12*1)+(exp13*1)+(exp14*1)+(exp15*1)+(exp16*1)+(exp17*1)+(exp18*1))*12)+
                      ((exp21*1)+(exp22*1)+(exp23*1)+(exp24*1)+(exp25*1)+(exp26*1)+(exp27*1)+(exp28*1));
      let expTotal = this.expTotal;

      this.DTI = (expTotal/incomeTotal)*100;

      this.navCtrl.push('ShowRisk1Page',{'DTI':this.DTI});
      console.info("DTI=="+this.DTI);

    }
    if(this.fhcInstant.income11==null){
      this.navCtrl.push('FhcInstantPage');
      this.alert();
    }

  }
  alert(){

    let alert = this.alertCtrl.create({
      title: 'ขออภัย!',
      subTitle: 'กรุณากรอกข้อมูลเงินเดือน',
      buttons: ['ปิด']
    });
    alert.present();

  }

  alert2(){

    let alert = this.alertCtrl.create({
      title: 'ขออภัย!',
      subTitle: 'ห้ามกรอกจำนวนติดลบ',
      buttons: ['ปิด']
    });
    alert.present();

  }

  test(ev: any) {

    let val = ev.target.value;

    if(val < 0){
      this.alert2();
    }

  }
}
