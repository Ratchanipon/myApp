import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../model/income';
import { AddIncomeProvider } from '../../providers/income-services/add-income';
import { IncomeProvider } from '../../providers/income-services/income';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';

/**
 * Generated class for the AddIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-income',
  templateUrl: 'add-income.html',
})
export class AddIncomePage {

  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public addIncom_: AddIncomeProvider,
              public incomeCate: CateIncomeProvider,
              public toastCtrl: ToastController) {

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIncomePage');
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
      created:[d,Validators.compose([Validators.required])],

    })

  }

  addIncome(income:Income){
    console.log(income);
    this.addIncom_.AddIncome(this.income.value);

    if(income != null){
      this.addIncomeSuccess();

      // this.navCtrl.setRoot('AddIncomePage');   
      // const root = this.app.getRootNav();
      // root.popToRoot();
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
