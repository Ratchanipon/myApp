import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddIncomeProvider } from '../../providers/income-services/add-income';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';
import { Income } from '../../model/income';

/**
 * Generated class for the AddIncomeMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-income-main',
  templateUrl: 'add-income-main.html',
})
export class AddIncomeMainPage {

  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public addIncom_: AddIncomeProvider,
              public incomeCate: CateIncomeProvider,
              public toastCtrl: ToastController) {

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIncomeMainPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.incomeCate.getCateIncome().then(data => {
      this.incomeCateList = data;
    })
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;
    let d = date.getDate();
    // let m = date.getMonth();
    // let y = date.getFullYear();
    // console.log(datenow);
    
    this.income = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      income_cate_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],

    })

  }

  addIncome(income:Income){
    console.log(income);
    this.addIncom_.AddIncome(this.income.value);

    if(income != null){
      this.addIncomeSuccess();

      this.navCtrl.setRoot('IncomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addIncomeSuccess() {
    let toast = this.toastCtrl.create({
      message: 'บันทึกรายการสำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
