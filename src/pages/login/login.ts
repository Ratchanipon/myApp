import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
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
        public formBuilder: FormBuilder,
        public toastCtrl: ToastController){

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
        this.loginSuccess()
        console.error(this.user);
        localStorage.setItem("user_id",this.user.id);
        localStorage.setItem("email",this.user.email);
         //this.navCtrl.push("TPage",{'u':user});

        this.navCtrl.setRoot('HomePage',{'user':user});    
        const root = this.app.getRootNav();
        root.popToRoot();
      }
      else{
        this.invalid();
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
        root.popToRoot();
      }

    })

  }
  loginSuccess() {
    let toast = this.toastCtrl.create({
      message: 'ลงชื่อเข้าใช้สำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  invalid() {
    let toast = this.toastCtrl.create({
      message: 'ข้อมูลผู้ใช้ไม่ถูกต้อง',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
}
