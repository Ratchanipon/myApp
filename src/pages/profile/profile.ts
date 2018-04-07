import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserByIdProvider } from '../../providers/user-service/user-serviceById';
import { User } from '../../model/user';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-dueDateByUserId';
import { DueDate } from '../../model/due-date';

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
  duedate:any;

  name:string;
  surname:string;
  email:string;
  password:string;
  age:string;
  sex:string;
  career:string;


  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userById: UserByIdProvider,
              public dueDateByUserId: DueDateByUserIdProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

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
      
    })

    this.dueDateByUserId.getDueDateById().then(data =>{
      this.duedate = data;
      console.log(this.duedate);
      
    })

    
    
  }

}
