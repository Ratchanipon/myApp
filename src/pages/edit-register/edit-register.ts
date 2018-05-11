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
  userData:User;
  animateClass:any;

  name:string;
  surname:string;
  email:string;
  password:string;
  age:string;
  sex:string;
  career:string;

  t_password:string="";
  f_password:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public editUser: EditUserProvider,
              public toastCtrl: ToastController,
              public userById: UserByIdProvider) {

                this.userById.getUserById().then((data:User) => {
                  this.userData = data;
                  console.log(this.user);
                  this.name = this.userData.name;
                  this.surname = this.userData.surname;
                  this.email = this.userData.email;
                  this.password = this.userData.password;
                  this.age = this.userData.age;
                  this.sex = this.userData.sex;
                  this.career = this.userData.career;

                  this.user.controls['name'].setValue(this.name);
                  this.user.controls['surname'].setValue(this.surname);
                  this.user.controls['email'].setValue(this.email);
                  this.user.controls['password'].setValue(this.password);
                  this.user.controls['con_password'].setValue(this.password);
                  this.user.controls['age'].setValue(this.age);
                  this.user.controls['sex'].setValue(this.sex);
                  this.user.controls['career'].setValue(this.career);
                  
                });

                this.form();
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.form();

      this.animateClass = { 'fade-in-item': true };
    
  }

  confirmPassowrd(){
    let password:string = this.user.controls['password'].value;

    let con_password:string = this.user.controls['con_password'].value;

    if(con_password == ""){
      this.f_password = "";
      this.t_password = "";
    }
    else if(con_password == password){
      this.t_password = "555";
      this.f_password = "";
    }
    else{
      this.t_password = "";
      this.f_password = "555";
    }
  }

  form(){

    // let name = sessionStorage.getItem("name");
    // let surname = sessionStorage.getItem("surname");
    // let password = sessionStorage.getItem("password");
    // let con_password = sessionStorage.getItem("con_password");
    // let email = sessionStorage.getItem("email");
    // let age = sessionStorage.getItem("age");
    // let sex = sessionStorage.getItem("sex");
    // let career = sessionStorage.getItem("career");

    let user_id = localStorage.getItem("user_id");
    console.log("user_id=========",user_id);
    
    this.user = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      name:['',Validators.compose([Validators.required,
                                         Validators.minLength(3)])],
      surname:['',Validators.compose([Validators.required,
                                            Validators.minLength(3)])],
      password:['',Validators.compose([Validators.required,
                                                  Validators.minLength(8),
                                                  Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      con_password:['',Validators.compose([Validators.required,
                                                    Validators.minLength(8),
                                                    Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      email:['',Validators.compose([Validators.required,
                                                  Validators.email])],
      age:['',Validators.compose([Validators.required])],
      sex:['',Validators.compose([Validators.required])],
      career:['',Validators.compose([Validators.required])]
    })

  }
  register(user:User){

    console.log("user======",user);
    this.editUser.EditUserProvider(this.user.value).then(user => {
      console.log("user======",user);

      if(user != null){
        // this.addUserSuccess();
        // this.navCtrl.push('RegisterPage');
        // localStorage.setItem("user_id",user.id);
        localStorage.setItem("user_id",user.id);
        localStorage.setItem("email",user.email);

        // sessionStorage.clear();

        sessionStorage.setItem("name",user.name);
        sessionStorage.setItem("surname",user.surname);
        sessionStorage.setItem("password",user.password);
        sessionStorage.setItem("email",user.email);
        sessionStorage.setItem("age",user.age);
        sessionStorage.setItem("sex",user.sex);
        sessionStorage.setItem("career",user.career);

        // this.navCtrl.setRoot('DueDatePage',{'user':user});   
        // const root = this.app.getRootNav();
        // root.popToRoot();
        
        this.navCtrl.push('DueDatePage');

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

}
