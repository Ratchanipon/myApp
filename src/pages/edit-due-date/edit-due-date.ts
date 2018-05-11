import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DueDate } from '../../model/due-date';
import { EditDueDateProvider } from '../../providers/due-date-services/edit-due-date-services';
import { CateCreditCardProvider } from '../../providers/category-services/cate-cradit-card';

/**
 * Generated class for the EditDueDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-due-date',
  templateUrl: 'edit-due-date.html',
})
export class EditDueDatePage {

  dueDate:FormGroup;
  creditList:any;

  credit_card:number;
  credit_card_id:number;

  credit_card2:number;
  credit_card_id2:number;

  credit_card3:number;
  credit_card_id3:number;

  credit_card4:number;
  credit_card_id4:number;

  credit_card5:number;
  credit_card_id5:number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public credit: CateCreditCardProvider,
              public dueDate_: DueDateByUserIdProvider,
              public editDuedate: EditDueDateProvider,
              public toastCtrl: ToastController) {

                this.credit.getCreditCard().then(data => {
                  this.creditList = data; 
                });

                this.dueDate_.getDueDate().then((data:any) => {
                  let water = data.water;
                  this.dueDate.controls['water'].setValue(water);
                  let electricity = data.electricity;
                  this.dueDate.controls['electricity'].setValue(electricity);
                  let internet = data.internet;
                  this.dueDate.controls['internet'].setValue(internet);
                  let telephone = data.telephone;
                  this.dueDate.controls['telephone'].setValue(telephone);
                });

                this.dueDate_.getCreditCard1().then((data:any) => {
                  this.credit_card = data.credit_card;
                  this.credit_card_id = data.credit_id; 
                  this.dueDate.controls['credit_card'].setValue(this.credit_card);
                  this.dueDate.controls['credit_card_id'].setValue(this.credit_card_id);      
                });
                this.dueDate_.getCreditCard2().then((data:any) => {
                  this.credit_card2 = data.credit_card;
                  this.credit_card_id2 = data.credit_id;       
                  this.dueDate.controls['credit_card2'].setValue(this.credit_card2);
                  this.dueDate.controls['credit_card_id2'].setValue(this.credit_card_id2);  
                });
                this.dueDate_.getCreditCard3().then((data:any) => {
                  this.credit_card3 = data.credit_card;
                  this.credit_card_id3 = data.credit_id;    
                  this.dueDate.controls['credit_card3'].setValue(this.credit_card3);
                  this.dueDate.controls['credit_card_id3'].setValue(this.credit_card_id3);     
                });
                this.dueDate_.getCreditCard4().then((data:any) => {
                  this.credit_card4 = data.credit_card;
                  this.credit_card_id4 = data.credit_id;    
                  this.dueDate.controls['credit_card4'].setValue(this.credit_card4);
                  this.dueDate.controls['credit_card_id4'].setValue(this.credit_card_id4);     
                });
                this.dueDate_.getCreditCard5().then((data:any) => {
                  this.credit_card5 = data.credit_card;
                  this.credit_card_id5 = data.credit_id;  
                  this.dueDate.controls['credit_card5'].setValue(this.credit_card5);
                  this.dueDate.controls['credit_card_id5'].setValue(this.credit_card_id5);       
                });

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDueDatePage');
    this.form();
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    
    this.dueDate = this.formBuilder.group({
      user_id:[user_id,Validators.compose([])],
      water:[null,Validators.compose([Validators.max(31)])],
      electricity:[null,Validators.compose([Validators.max(31)])],
      internet:[null,Validators.compose([Validators.max(31)])],
      telephone:[null,Validators.compose([Validators.max(31)])],
      credit_card_id:[null,Validators.compose([])],
      credit_card_id2:[null,Validators.compose([])],
      credit_card_id3:[null,Validators.compose([])],
      credit_card_id4:[null,Validators.compose([])],
      credit_card_id5:[null,Validators.compose([])],
      credit_card:[null,Validators.compose([Validators.max(31)])],
      credit_card2:[null,Validators.compose([Validators.max(31)])],
      credit_card3:[null,Validators.compose([Validators.max(31)])],
      credit_card4:[null,Validators.compose([Validators.max(31)])],
      credit_card5:[null,Validators.compose([Validators.max(31)])]
    })

  }

  editDueDate(dueDate:DueDate){
    console.log(dueDate);
    this.editDuedate.EditDueDate(this.dueDate.value);

    if(dueDate != null){
      this.editDueDateSuccess();
      this.navCtrl.setRoot('ShowDueDatePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editDueDateSuccess() {
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

  ShowDueDatePage(){
    this.navCtrl.setRoot('ShowDueDatePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
  }

}
