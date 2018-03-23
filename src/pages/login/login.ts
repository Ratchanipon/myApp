import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { User } from '../../model/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // public user:FormGroup;
  public user:User;
  
  userList: any;
  
  constructor(
        public navCtrl: NavController,
        public navParams: NavParams, 
        private userService:UserServiceProvider,
        private storage: Storage,
        public app: App,
        public formBuilder: FormBuilder){

          // this.user = this.formBuilder.group({
          //   email: ['', Validators.required],
          //   password: ['',Validators.required]
          // });
          // console.log(this.user);
          
          this.user = {surname:'', password:'anusit1234',id:"" ,name:"", email:"anusit@hotmail.com", age:"", career:"", sex:"", permission:""};
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user:User){
    
    this.userService.loginProvider(user).then(user=>{
      console.error(user);
      this.user = user;
      if(this.user!=null){
        console.error(this.user);
        localStorage.setItem("user_id",this.user.id);
        localStorage.setItem("email",this.user.email);
         //this.navCtrl.push("TPage",{'u':user});

        this.navCtrl.setRoot('HomePage',{'user':user});    
        const root = this.app.getRootNav();
        root.popToRoot();
      }
      else{
        alert('ข้อมูลไม่ถูกต้อง');
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
        root.popToRoot();
        
        
      }
    }).catch(e=>{
      console.error(e);
      
    });

      // this.storage.set('user', this.user);
      // this.storage.get('user').then((val) => {
      // console.log('Your user is', val);
      // });
      
  

    }
  
}
