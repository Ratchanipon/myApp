import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { AddDailyExpensesProvider } from '../../providers/daily-expenses-services/add-daily-expenses';
import { CateDailyExpensesProvider } from '../../providers/category-services/cate-daily-expenses';
import { DailyExpenses } from '../../model/add-daily-expenses';
import { DailyExpensesProvider } from '../../providers/daily-expenses-services/daily-expenses';

/**
 * Generated class for the AddDailyExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-daily-expenses',
  templateUrl: 'add-daily-expenses.html',
})
export class AddDailyExpensesPage {
  animateClass:any;
  dailyExpenses:FormGroup;
  dailyExpensesCate:any;
  paymentCate:any;

  dailyExpensesList:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public dailyExpCate: CateDailyExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public dailyExpenses_: DailyExpensesProvider,
              public addDailyExp: AddDailyExpensesProvider) {

                this.form();
                this.dailyExpenses_.getDailyExpenses().then(data => {
                  this.dailyExpensesList = data;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDailyExpensesPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.dailyExpCate.getCateDailyExpenses().then(data => {
      this.dailyExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;
    
    this.dailyExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      daily_expenses_cate_id:[null,Validators.compose([Validators.required])],
      payment_channel_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],

    })

  }

  addDailyExpenses(dailyExpenses:DailyExpenses){
    console.log(dailyExpenses);
    
    this.addDailyExp.AddDailyExpenses(this.dailyExpenses.value);

    if(dailyExpenses != null){
      this.addDailyExpensesSuccess();

      this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addDailyExpensesSuccess() {
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
