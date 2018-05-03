import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CateDailyExpensesProvider } from '../../providers/category-services/cate-daily-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { DailyExpenses } from '../../model/add-daily-expenses';
import { EditDailyExpensesProvider } from '../../providers/daily-expenses-services/edit-daily-expenses';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import { initializeApp } from 'firebase/app';
import { FirebaseConfig } from '../../app/firebae-Config';

/**
 * Generated class for the EditDailyExpensesPage page.
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
  selector: 'page-edit-daily-expenses',
  templateUrl: 'edit-daily-expenses.html',
})
export class EditDailyExpensesPage {

  animateClass:any;
  dailyExpenses:FormGroup;
  dailyExpensesCate:any;
  paymentCate:any;

  data:any;

  options:CameraOptions;
  images:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public dailyExpCate: CateDailyExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public camera:Camera,
              public editDailyExp: EditDailyExpensesProvider) {

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
    console.log('ionViewDidLoad AddDailyExpensesPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.dailyExpCate.getCateDailyExpenses().then(data => {
      this.dailyExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })
  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;

    this.data = this.navParams.data;
    let daily_expenses_id = this.data.daily_expenses_id;
    let daily_expenses_cate_id = this.data.daily_expenses_cate_id;
    let payment_channel_id = this.data.payment_channel_id;
    let amount = this.data.amount;
    let created = this.data.created;

    this.images = this.data.images;

    this.dailyExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      daily_expenses_id:[daily_expenses_id,Validators.compose([Validators.required])],
      daily_expenses_cate_id:[daily_expenses_cate_id,Validators.compose([Validators.required])],
      payment_channel_id:[payment_channel_id,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],
      images:['',Validators.compose([])]

    })

  }

  editDailyExpenses(dailyExpenses:DailyExpenses){
    
    console.log(dailyExpenses);
    this.editDailyExp.editDailyExpenses(this.dailyExpenses.value);

    if(dailyExpenses != null){
      this.editDailyExpensesSuccess();

      this.navCtrl.setRoot('DailyExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editDailyExpensesSuccess() {
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
        const picture = storage().ref().child('images3/'+name+'.jpg');
        picture.putString(image,'data_url').then(data=>{
          this.loadpicture(name);
          // this.presentToast('up :'+data.state)
        }).catch(e=>{
          this.presentToast('e :'+e);
        });

    }catch(error){
      this.presentToast('e :'+error);
    }
  }

  async loadpicture(name){

    let file =  storage().ref().child('images3/'+name+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.images = url;
      this.dailyExpenses.controls['images'].setValue(url);
      console.log('Url :',url);
      // this.presentToast('Url :'+url);
      
    });
  }

}
