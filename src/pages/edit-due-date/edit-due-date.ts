import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DueDate } from '../../model/due-date';
import { EditDueDateProvider } from '../../providers/due-date-services/edit-due-date-services';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public dueDate_: DueDateByUserIdProvider,
              public editDuedate: EditDueDateProvider,
              public toastCtrl: ToastController) {

                this.dueDate_.getDueDate().then((data:any) => {
                  let water = data.water;
                  let electricity = data.electricity;
                  let internet = data.internet;
                  let telephone = data.telephone;
                });

                this.dueDate_.getCreditCard1().then((data:any) => {
                  let credit_card1 = data.credit_card;
                  let credit_name1 = data.credit;       
                });
                this.dueDate_.getCreditCard2().then((data:any) => {
                  let credit_card2 = data.credit_card;
                  let credit_name2 = data.credit;       
                });
                this.dueDate_.getCreditCard3().then((data:any) => {
                  let credit_card3 = data.credit_card;
                  let credit_name3 = data.credit;       
                });
                this.dueDate_.getCreditCard4().then((data:any) => {
                  let credit_card4 = data.credit_card;
                  let credit_name4 = data.credit;       
                });
                this.dueDate_.getCreditCard5().then((data:any) => {
                  let credit_card5 = data.credit_card;
                  let credit_name5 = data.credit;       
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
    this.editDuedate.AddDueDate(this.dueDate.value);

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

}
