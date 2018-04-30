import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CateFixedExpensesProvider } from '../../providers/category-services/cate-fixed-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { FixedExpenses } from '../../model/fixed-expenses';
import { AddFixedExpensesProvider } from '../../providers/fixed-expenses-services/add-fixed_expenses';
import { FixedExpensesProvider } from '../../providers/fixed-expenses-services/fixed-expenses';

/**
 * Generated class for the AddFixedExpensesMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-fixed-expenses-main',
  templateUrl: 'add-fixed-expenses-main.html',
})
export class AddFixedExpensesMainPage {
  animateClass:any;
  fixedExpensesCate:any;
  paymentCate:any;
  
  fixedExpenses:FormGroup;

  fixedExpensesList:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public fixedExpCate: CateFixedExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public fixedExpenses_: FixedExpensesProvider,
              public addFixedExp: AddFixedExpensesProvider) {

                this.form();
                this.fixedExpenses_.getFixedExpenses().then(data => {
                  this.fixedExpensesList = data;
                  console.log(this.fixedExpensesList);
                  
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFixedExpensesPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.fixedExpCate.getCateFixedExpenses().then(data => {
      this.fixedExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })

  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;
    
    this.fixedExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      fix_expenses_cate_id:[null,Validators.compose([Validators.required])],
      payment_channel_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],

    })

  }

  addFixedExpenses(fixedExpenses:FixedExpenses){
    console.log(fixedExpenses);
    
    this.addFixedExp.AddFixedExpenses(this.fixedExpenses.value);

    if(fixedExpenses != null){
      this.addFixedExpensesSuccess();

      this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addFixedExpensesSuccess() {
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
