import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CateCreditCardProvider } from '../../providers/category-services/cate-cradit-card';
import { DueDate } from '../../model/due-date';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DueDateProvider } from '../../providers/due-date-services/add-due-date-services';

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

  // day = (): Array<any> => {
  //   return [
  //     {"day" : 1},{"day" : 2},{"day" : 3},{"day" : 4},{"day" : 5},{"day" : 6},{"day" : 7},{"day" : 8},
  //     {"day" : 9},{"day" : 10},{"day" : 11},{"day" : 12},{"day" : 13},{"day" : 14},{"day" : 15},{"day" : 16},
  //     {"day" : 17},{"day" : 18},{"day" : 19},{"day" : 20},{"day" : 21},{"day" : 22},{"day" : 23},{"day" : 24},
  //     {"day" : 25},{"day" : 26},{"day" : 27},{"day" : 28},{"day" : 29},{"day" : 30},{"day" : 31}
  //   ];
  // };
  // user_id:any;

  creditList:any;
  dueDate:FormGroup;

  animateClass:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public credit: CateCreditCardProvider,
              public dueDate_: DueDateProvider,
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
      credit_card:[null,Validators.compose([Validators.required])]
    })

  }

  addDueDate(dueDate:DueDate){
    console.log(dueDate);
    this.dueDate_.AddDueDate(this.dueDate.value);

    if(dueDate != null){
      this.addDueDateSuccess()
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
