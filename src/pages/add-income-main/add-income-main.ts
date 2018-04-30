import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddIncomeProvider } from '../../providers/income-services/add-income';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';
import { Income } from '../../model/income';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage ,initializeApp } from 'firebase';
import { IncomeProvider } from '../../providers/income-services/income';

/**
 * Generated class for the AddIncomeMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

var config = {
  apiKey: "AIzaSyBiTQt8D-8MFdhk1m1HJtZaMu4eNf7Ywa0",
  authDomain: "fchs-526b9.firebaseapp.com",
  databaseURL: "https://fchs-526b9.firebaseio.com",
  projectId: "fchs-526b9",
  storageBucket: "fchs-526b9.appspot.com",
  messagingSenderId: "405662539355"
};

initializeApp(config);

@IonicPage()
@Component({
  selector: 'page-add-income-main',
  templateUrl: 'add-income-main.html',
})
export class AddIncomeMainPage {

  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;

  options:CameraOptions;

  images:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public addIncom_: AddIncomeProvider,
              public incomeCate: CateIncomeProvider,
              public income_2: IncomeProvider,
              public camera:Camera,
              public toastCtrl: ToastController) {

                this.options  = {
                  quality:100,
                  targetHeight:300,
                  targetWidth:300,
                  destinationType:this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  mediaType: this.camera.MediaType.PICTURE,
                  correctOrientation: true,
                  cameraDirection:1
                };
                this.form();      
                this.income_2.getIncome().then((data:Income) => {
                  this.incomeList = data;
        
            })       

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIncomeMainPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.incomeCate.getCateIncome().then(data => {
      this.incomeCateList = data;
    })
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;
    let d = date.getDate();
    // let m = date.getMonth();
    // let y = date.getFullYear();
    // console.log(datenow);
    
    this.income = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      income_cate_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],
      images:['',Validators.compose([])]

    })

  }

  addIncome(income:Income){
    console.log(income);
    this.addIncom_.AddIncome(this.income.value);

    if(income != null){
      this.addIncomeSuccess();

      this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addIncomeSuccess() {
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

  presentToast(messages) {
    let toast = this.toastCtrl.create({
      message: messages,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }



  async takePicture(){
    //this.loadpictureProfile();
    try {
        let d = new Date().getDate().toString();
        let y = new Date().getFullYear().toString();
        let t = new Date().getTime().toString();

        let name = d+y+t ;
        
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/'+name+'.jpg');
        picture.putString(image,'data_url').then(data=>{
          this.loadpicture(name);
          this.presentToast('up :'+data.state)
        }).catch(e=>{
          this.presentToast('e :'+e);
        });

    }catch(error){
      this.presentToast('e :'+error);
    }
  }

  async loadpicture(name){

    let file =  storage().ref().child('images/'+name+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.images = url;
      this.income.controls['images'].setValue(url);
      console.log('Url :',url);
      this.presentToast('Url :'+url);
      
    });
  }


}
