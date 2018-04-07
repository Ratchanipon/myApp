import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CateDailyExpensesProvider } from '../../providers/category-services/cate-daily-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { DailyExpenses } from '../../model/add-daily-expenses';
import { EditDailyExpensesProvider } from '../../providers/daily-expenses-services/edit-daily-expenses';

/**
 * Generated class for the EditDailyExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-daily-expenses',
  templateUrl: 'edit-daily-expenses.html',
})
export class EditDailyExpensesPage {

  animateClass:any;
  dailyExpenses:FormGroup;
  dailyExpensesCate:any;
  paymentCate:any;

  data:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public dailyExpCate: CateDailyExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public editDailyExp: EditDailyExpensesProvider) {

                this.form();
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

    this.data = this.navParams.data;
    let daily_expenses_id = this.data.daily_expenses_id;
    let daily_expenses_cate_id = this.data.daily_expenses_cate_id;
    let payment_channel_id = this.data.payment_channel_id;
    let amount = this.data.amount;
    let created = this.data.created;


    this.dailyExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      daily_expenses_id:[daily_expenses_id,Validators.compose([Validators.required])],
      daily_expenses_cate_id:[daily_expenses_cate_id,Validators.compose([Validators.required])],
      payment_channel_id:[payment_channel_id,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],

    })

  }

  editDailyExpenses(dailyExpenses:DailyExpenses){
    console.log(dailyExpenses);
    
    this.editDailyExp.editDailyExpenses(this.dailyExpenses.value);

    if(dailyExpenses != null){
      this.editDailyExpensesSuccess();

      this.navCtrl.setRoot('DailyExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editDailyExpensesSuccess() {
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
