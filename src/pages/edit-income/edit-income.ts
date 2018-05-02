import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { Income } from '../../model/income';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';
import { EditIncomeProvider } from '../../providers/income-services/edit-income';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FirebaseConfig } from '../../app/firebae-Config';

// import { initializeApp } from 'firebase/app';


/**
 * Generated class for the EditIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// var config = {
//   apiKey: "AIzaSyBiTQt8D-8MFdhk1m1HJtZaMu4eNf7Ywa0",
//   authDomain: "fchs-526b9.firebaseapp.com",
//   databaseURL: "https://fchs-526b9.firebaseio.com",
//   projectId: "fchs-526b9",
//   storageBucket: "fchs-526b9.appspot.com",
//   messagingSenderId: "405662539355"
// };
// initializeApp(FirebaseConfig);

@IonicPage()
@Component({
  selector: 'page-edit-income',
  templateUrl: 'edit-income.html',
})
export class EditIncomePage {
  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;

  data:any;
  dataE:any;

  options:CameraOptions;
  images:string="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public editIncom_: EditIncomeProvider,
              public incomeCate: CateIncomeProvider,
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
  }

  ionViewDidLoad() {

    this.animateClass = { 'fade-in-right-item': true };

    console.log('ionViewDidLoad EditIncomePage');
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


    //รับค่าจาก IncomePage
    this.data = this.navParams.data;
    let income_id = this.data.income_id;
    let amount = this.data.amount;
    let category = this.data.category;
    console.log("category----",category);
    
    let created = this.data.created;
    let cate_id = this.data.income_cate_id;  

    this.images = this.data.images;


    this.income = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      income_id:[income_id,Validators.compose([Validators.required])],
      income_cate_id:[cate_id,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],
      images:['',Validators.compose([])]

    })

  }

  editIncome(income:Income){
    console.log("editIncome++")
    console.log(income);
    this.editIncom_.EditIncome(this.income.value);

    if(income != null){
      this.editIncomeSuccess(); 

      this.navCtrl.setRoot('IncomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editIncomeSuccess() {
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
        let m = new Date().getMonth().toString();
        let y = new Date().getFullYear().toString();
        let t = new Date().getTime().toString();

        let name = d+m+y+t ;
        
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
