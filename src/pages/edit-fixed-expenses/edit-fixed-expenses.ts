import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CateFixedExpensesProvider } from '../../providers/category-services/cate-fixed-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { EditFixedExpensesProvider } from '../../providers/fixed-expenses-services/edit-fixed_expenses';
import { FixedExpenses } from '../../model/fixed-expenses';

/**
 * Generated class for the EditFixedExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-fixed-expenses',
  templateUrl: 'edit-fixed-expenses.html',
})
export class EditFixedExpensesPage {

  animateClass:any;
  fixedExpensesCate:any;
  paymentCate:any;
  
  fixedExpenses:FormGroup;

  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public fixedExpCate: CateFixedExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public editFixedExp_: EditFixedExpensesProvider) {

                this.form();
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

    this.data = this.navParams.data;
    let fix_expenses_id = this.data.fix_expenses_id;
    let amount =this.data.amount;
    let created =this.data.created;
    let payment_channel_id = this.data.payment_channel_id;
    let fix_expenses_cate_id = this.data.fix_expenses_cate_id;

    this.fixedExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      fix_expenses_id:[fix_expenses_id,Validators.compose([Validators.required])],
      fix_expenses_cate_id:[fix_expenses_cate_id,Validators.compose([Validators.required])],
      payment_channel_id:[payment_channel_id,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],

    })

  }

  editFixedExpenses(fixedExpenses:FixedExpenses){
    console.log(fixedExpenses);
    
    this.editFixedExp_.editFixedExpenses(this.fixedExpenses.value);

    if(fixedExpenses != null){
      this.editFixedExpensesSuccess();

      this.navCtrl.setRoot('FixedExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editFixedExpensesSuccess() {
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
