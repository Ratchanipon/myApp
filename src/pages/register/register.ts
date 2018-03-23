import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public addUser: AddUserProvider) {
                
                this.form();
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.form();
    
  }

  form(){

    this.user = this.formBuilder.group({
      name:['อนุศิษฐ์',Validators.compose([Validators.required])],
      surname:['สิงห์นิกร',Validators.compose([Validators.required])],
      password:['not12345678',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required])],
      age:['22',Validators.compose([Validators.required])],
      sex:['ชาย',Validators.compose([Validators.required])],
      career:['นศ',Validators.compose([Validators.required])]
    })

  }
  register(user){
    // ทดสอบดูค่าต่างๆ ที่ส่งมาจากฟอร์ม 
    console.log(user);

    this.addUser.AddUserProvider(user);
    // console.log(user.value);
    // console.log(user.valid);
  }
}
