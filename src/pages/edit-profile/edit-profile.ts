import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

                  sessionStorage.setItem("name",this.name);
                  sessionStorage.setItem("surname",this.surname);
                  sessionStorage.setItem("email",this.email);
                  sessionStorage.setItem("email",this.password);
                  sessionStorage.setItem("age",this.age);
                  sessionStorage.setItem("sex",this.sex);
                  sessionStorage.setItem("career",this.career);
                  
                });

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');

    this.form();
  }

  form(){

    let name = sessionStorage.getItem("name");
    let surname = sessionStorage.getItem("surname");
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");
    let age = sessionStorage.getItem("age");
    let sex = sessionStorage.getItem("sex");
    let career = sessionStorage.getItem("career");

    let user_id = localStorage.getItem("user_id");
    console.log("user_id=========",user_id);
    console.log("name==========",this.name);
    
    this.user = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      name:[name,Validators.compose([Validators.required,
                                    Validators.minLength(3)])],
      surname:[surname,Validators.compose([Validators.required,
                                           Validators.minLength(3)])],
      email:[email,Validators.compose([Validators.required,
                                       Validators.email])],
      password:[password,Validators.compose([Validators.required,
                                             Validators.minLength(8),
                                             Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      age:[age,Validators.compose([Validators.required])],
      sex:[sex,Validators.compose([Validators.required])],
      career:[career,Validators.compose([Validators.required])]
    })

  }

  editProfile(user:User){

    console.log("user======",user);
    this.editUser.EditUserProvider(this.user.value).then(user => {
      console.log("user======",user);

      if(user != null){
        // this.addUserSuccess();
        // this.navCtrl.push('RegisterPage');
        // localStorage.setItem("user_id",user.id);
        localStorage.setItem("email",user.email);



        // this.navCtrl.setRoot('DueDatePage',{'user':user});   
        // const root = this.app.getRootNav();
        // root.popToRoot();
        
        this.navCtrl.push('ProfilePage');

      }
    })

  }

}
