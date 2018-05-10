import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserByIdProvider } from '../../providers/user-service/user-serviceById';
import { User } from '../../model/user';
import { DueDate } from '../../model/due-date';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:User;
  duedate:DueDate;

  name:string;
  surname:string;
  email:string;
  password:string;
  age:string;
  sex:string;
  career:string;

    water: number;
    electricity: number;
    internet: number;
    telephone: number;
    credit_card: number;
    credit_card2: number;
    credit_card3: number;
    credit_card4: number;
    credit_card5: number;
    credit_card_id: number;
    credit_card_id2: number;
    credit_card_id3: number;
    credit_card_id4: number;
    credit_card_id5: number;
    credit1:string;
    credit2:string;
    credit3:string;
    credit4:string;
    credit5:string;

  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userById: UserByIdProvider,
              public duedate_:DueDateByUserIdProvider
            ) {

                this.userById.getUserById().then((data:User) => {
                  this.user = data;
                  console.log(this.user);
                  this.name = this.user.name;
                  this.surname = this.user.surname;
                  this.email = this.user.email;
                  this.password = this.user.password;
                  this.age = this.user.age;
                  this.sex = this.user.sex;
                  this.career = this.user.career;
                  
                });

                this.duedate_.getCreditCard1().then(data => {
                  console.log("data==",data);
                  
                })
            
                // this.dueDateByUserId.getDueDateById().then((data:DueDate) =>{
                //   this.duedate = data;
                //   console.log('duedate===',this.duedate);
            
                //   this.water = this.duedate.water;
                //   console.log("water===",this.water);
                  
                //   this.electricity = this.duedate.electricity;
                //   this.telephone = this.duedate.telephone;
                //   this.internet = this.duedate.internet;
                //   this.credit_card = this.duedate.credit_card;
                //   this.credit_card2 = this.duedate.credit_card2;
                //   this.credit_card3 = this.duedate.credit_card3;
                //   this.credit_card4 = this.duedate.credit_card4;
                //   this.credit_card5 = this.duedate.credit_card5;
                //   this.credit_card_id = this.duedate.credit_card_id;
                //   this.credit_card_id2 = this.duedate.credit_card_id2;
                //   this.credit_card_id3 = this.duedate.credit_card_id3;
                //   this.credit_card_id4 = this.duedate.credit_card_id4;
                //   this.credit_card_id5 = this.duedate.credit_card_id5;
                //   this.credit1 = this.duedate.credit1;
                //   this.credit2 = this.duedate.credit2;
                //   this.credit3 = this.duedate.credit3;
                //   this.credit4 = this.duedate.credit4;
                //   this.credit5 = this.duedate.credit5;
                  
                // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    
    
  }

}
