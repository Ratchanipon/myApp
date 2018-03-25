import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { CateCreditCardProvider } from '../../providers/category-services/cate-cradit-card';
import { DueDate } from '../../model/due-date';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDueDateProvider } from '../../providers/due-date-services/add-due-date-services';

/**
 * Generated class for the DueDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-due-date',
  templateUrl: 'due-date.html',
})
export class DueDatePage {

  [x: string]: any;

  creditList:any;
  dueDate:FormGroup;

  animateClass:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public credit: CateCreditCardProvider,
              public addDueDate_: AddDueDateProvider,
              public toastCtrl: ToastController) {

                this.form();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DueDatePage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.credit.getCreditCard().then(data => {
      this.creditList = data;
    
    // let user_id = localStorage.getItem("user_id");
    // this.user_id = user_id;
    
    })
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    
    this.dueDate = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      water:[null,Validators.compose([Validators.required])],
      electricity:[null,Validators.compose([Validators.required])],
      internet:[null,Validators.compose([Validators.required])],
      telephone:[null,Validators.compose([Validators.required])],
      credit_card_id:[null,Validators.compose([Validators.required])]
    })

  }

  addDueDate(dueDate:DueDate){
    console.log(dueDate);
    this.addDueDate_.AddDueDate(this.dueDate.value);

    if(dueDate != null){
      this.addDueDateSuccess();
      this.navCtrl.setRoot('AddIncomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addDueDateSuccess() {
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
