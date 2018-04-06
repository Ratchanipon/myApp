import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserByIdProvider } from '../../providers/user-service/user-serviceById';
import { User } from '../../model/user';

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

  name:string;
  surname:string;
  email:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userById: UserByIdProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.userById.getUserById().then((data:User) => {
      this.user = data;
      console.log(this.user);
      this.name = this.user.name;
      this.surname = this.user.surname;
      
    })

    
    
  }

}
