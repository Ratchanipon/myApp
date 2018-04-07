import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { Income } from '../../model/income';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';
import { EditIncomeProvider } from '../../providers/income-services/edit-income';


/**
 * Generated class for the EditIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-income',
  templateUrl: 'edit-income.html',
})
export class EditIncomePage {
  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;

  data:any;
  category:string;
  cate_id:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public editIncom_: EditIncomeProvider,
              public incomeCate: CateIncomeProvider,
              public toastCtrl: ToastController) {

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditIncomePage');
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

    //รับค่าจาก IncomePage
    this.data = this.navParams.data;
    let income_id = this.data.income_id;
    let amount = this.data.amount;
    let category = this.data.category;
    let created = this.data.created;
  
    this.category = this.data.category;
    this.cate_id = this.data.income_cate_id;
    
    this.income = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      income_id:[income_id,Validators.compose([Validators.required])],
      income_cate_id:[null,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],

    })

  }

  editIncome(income:Income){
    console.log("editIncome++")
    console.log(income);
    this.editIncom_.EditIncome(this.income.value);

    if(income != null){
      this.editIncomeSuccess(); 

      this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editIncomeSuccess() {
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
