import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { User } from '../../model/user';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AddUserProvider } from '../../providers/user-service/add-users';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user:FormGroup;
  // user1:User = {surname:'สิงห์นิกร', password:'anusit1234',id:"" ,name:"อนุศิษฐ์", email:"anusit@hotmail.com", age:"22", career:"นักศึกษา", sex:"ชาย", permission:""};
  user1:User;
  animateClass:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public addUser: AddUserProvider,
              public toastCtrl: ToastController) {
                
                this.form();
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.form();

      this.animateClass = { 'fade-in-item': true };
    
  }

  form(){

    this.user = this.formBuilder.group({
      name:['อนุศิษฐ์',Validators.compose([Validators.required])],
      surname:['สิงห์นิกร',Validators.compose([Validators.required])],
      password:['not12345678',Validators.compose([Validators.required,
                                                  Validators.minLength(8),
                                                  Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      email:['',Validators.compose([Validators.required,
                                                  Validators.email])],
      age:['22',Validators.compose([Validators.required])],
      sex:['ชาย',Validators.compose([Validators.required])],
      career:['',Validators.compose([Validators.required])]
    })

  }
  register(user:User){
    // ทดสอบดูค่าต่างๆ ที่ส่งมาจากฟอร์ม 
    // console.log(this.user);
    this.addUser.AddUserProvider(this.user.value).then(user => {
      console.error(user);

      if(user != null){
        this.addUserSuccess();
        // this.navCtrl.push('RegisterPage');
        localStorage.setItem("user_id",user.id);
        localStorage.setItem("email",user.email);
        this.navCtrl.setRoot('DueDatePage',{'user':user});   
        const root = this.app.getRootNav();
        root.popToRoot();
        
        // this.navCtrl.push('DueDatePage');

         
        
      }
      if(user == null){
        this.Duplicate();
      }
    })
    // console.log(user.value);
    // console.log(user.valid);
  }
  

  addUserSuccess() {
    let toast = this.toastCtrl.create({
      message: 'สร้างบัญชีผู้ใช้งานสำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  Duplicate() {
    let toast = this.toastCtrl.create({
      message: 'มีอีเมลนี้อยู่ในระบบแล้ว กรุณากรอกอีเมลอีกครั้ง',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
