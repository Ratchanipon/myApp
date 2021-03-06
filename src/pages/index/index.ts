import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';
import { DueDate } from '../../model/due-date';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App,
              public dueDate: DueDateByUserIdProvider) {

                // this.dueDate.getCreditCard1().then(data => {
                //   // sessionStorage.setItem('water',data.water);
                //   // let water = data.water;
                //   console.log("water===",data);
                  
                // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  checkUserId(){
    let user_id = localStorage.getItem("user_id");
    
    if(user_id != null){
      this.navCtrl.setRoot('HomePage');    
      const root = this.app.getRootNav();
      root.popToRoot();
    }
    else{
      this.navCtrl.setRoot('LoginPage');    
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }
  
}
