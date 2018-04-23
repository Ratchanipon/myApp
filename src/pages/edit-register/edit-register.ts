import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { EditUserProvider } from '../../providers/user-service/edit-users';
import { UserByIdProvider } from '../../providers/user-service/user-serviceById';


/**
 * Generated class for the EditRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-register',
  templateUrl: 'edit-register.html',
})
export class EditRegisterPage {

  user:FormGroup;
  // user1:User = {surname:'สิงห์นิกร', password:'anusit1234',id:"" ,name:"อนุศิษฐ์", email:"anusit@hotmail.com", age:"22", career:"นักศึกษา", sex:"ชาย", permission:""};
  user1:User;
  animateClass:any;

  name:string;
  surname:string;
  email:string;
  password:string;
  age:string;
  sex:string;
  career:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public editUser: EditUserProvider,
              public toastCtrl: ToastController,
              public userById: UserByIdProvider) {
                
                this.form();
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.form();

      this.animateClass = { 'fade-in-item': true };
    
  }

  form(){

    let name = sessionStorage.getItem("name");
    let surname = sessionStorage.getItem("surname");
    let password = sessionStorage.getItem("password");
    let email = sessionStorage.getItem("email");
    let age = sessionStorage.getItem("age");
    let sex = sessionStorage.getItem("sex");
    let career = sessionStorage.getItem("career");

    let user_id = localStorage.getItem("user_id");
    console.log("user_id=========",user_id);
    
    this.user = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      name:[name,Validators.compose([Validators.required,
                                         Validators.minLength(3)])],
      surname:[surname,Validators.compose([Validators.required,
                                            Validators.minLength(3)])],
      password:[password,Validators.compose([Validators.required,
                                                  Validators.minLength(8),
                                                  Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      email:[email,Validators.compose([Validators.required,
                                                  Validators.email])],
      age:[age,Validators.compose([Validators.required])],
      sex:[sex,Validators.compose([Validators.required])],
      career:[career,Validators.compose([Validators.required])]
    })

  }
  register(user:User){
    // ทดสอบดูค่าต่างๆ ที่ส่งมาจากฟอร์ม 
    // console.log(this.user);
    this.editUser.EditUserProvider(this.user.value).then(user => {
      console.error(user);

      if(user != null){
        this.addUserSuccess();
        // this.navCtrl.push('RegisterPage');
        // localStorage.setItem("user_id",user.id);
        // localStorage.setItem("email",user.email);
        // this.navCtrl.setRoot('DueDatePage',{'user':user});   
        // const root = this.app.getRootNav();
        // root.popToRoot();
        
        this.navCtrl.push('DueDatePage');

         
        
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
