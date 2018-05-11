import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { UserByIdProvider } from '../../providers/user-service/user-serviceById';
import { User } from '../../model/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EditUserProvider } from '../../providers/user-service/edit-users';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user:FormGroup;
  user1:User;
  animateClass:any;

  userData:User;

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
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public userById: UserByIdProvider,
              public editUser: EditUserProvider,) {

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
                  this.user.controls['age'].setValue(this.age);
                  this.user.controls['sex'].setValue(this.sex);
                  this.user.controls['career'].setValue(this.career);
                  
                });

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.animateClass = { 'fade-in-item': true };

    this.form();
  }

  form(){

    let user_id = localStorage.getItem("user_id");
    console.log("user_id=========",user_id);
    
    this.user = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      name:['',Validators.compose([Validators.required,
                                    Validators.minLength(3)])],
      surname:['',Validators.compose([Validators.required,
                                           Validators.minLength(3)])],
      email:['',Validators.compose([Validators.required,
                                       Validators.email])],
      password:['',Validators.compose([Validators.required,
                                             Validators.minLength(8),
                                             Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      age:['',Validators.compose([Validators.required])],
      sex:['',Validators.compose([Validators.required])],
      career:['',Validators.compose([Validators.required])]
    })

  }

  editProfile(user:User){

    console.log("user======",user);
    this.editUser.EditUserProvider(this.user.value).then(user => {
      console.log("user======",user);

      if(user != null){
        this.editUserSuccess();

        localStorage.setItem("email",user.email);

        this.navCtrl.setRoot('ProfilePage',{'user':user});   
        const root = this.app.getRootNav();
        root.popToRoot();
        
        // this.navCtrl.push('ProfilePage');

      }
    })

  }
  editUserSuccess() {
    let toast = this.toastCtrl.create({
      message: 'บันทึกรายการสำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  ProfilePage(){
    // this.navCtrl.push("ProfilePage");
    this.navCtrl.setRoot('ProfilePage');   
        const root = this.app.getRootNav();
        root.popToRoot();
  }

}
