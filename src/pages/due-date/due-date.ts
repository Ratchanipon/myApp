import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CateCreditCardProvider } from '../../providers/category-services/cate-cradit-card';
import { DueDate } from '../../model/due-date';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  creditList:any;
  dueDate:FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public credit: CateCreditCardProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DueDatePage');

    this.credit.getCreditCard().then(data => {
      this.creditList = data;
    })
  }

  form(){

    this.dueDate = this.formBuilder.group({
      water:['',Validators.compose([Validators.required])],
      electricity:['',Validators.compose([Validators.required])],
      internet:['',Validators.compose([Validators.required])],
      telephone:['',Validators.compose([Validators.required])],
      credit_card:['',Validators.compose([Validators.required])],
    })

  }

  addDueDate(dueDate:DueDate){
    console.log(dueDate);
    

  }

}
