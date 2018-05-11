import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { AddDailyExpensesProvider } from '../../providers/daily-expenses-services/add-daily-expenses';
import { CateDailyExpensesProvider } from '../../providers/category-services/cate-daily-expenses';
import { DailyExpenses } from '../../model/add-daily-expenses';
import { DailyExpensesProvider } from '../../providers/daily-expenses-services/daily-expenses';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FirebaseConfig } from '../../app/firebae-Config';
import { SumIncomeProvider } from '../../providers/calculate-services/sum-income';
import { SumDailyExpensesProvider } from '../../providers/calculate-services/sum-daily-expenses';
import { SumFixedExpensesProvider } from '../../providers/calculate-services/sum-fixed-expenses';
import { SumIncome } from '../../model/get-sumIncome';
import { SumFixedExp } from '../../model/get-sumFixedExp';
import { SumDaileExp } from '../../model/get-sumDailyExp';

import { AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';


// import { initializeApp } from 'firebase/app';

/**
 * Generated class for the AddDailyExpensesPage page.
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
  selector: 'page-add-daily-expenses',
  templateUrl: 'add-daily-expenses.html',
})
export class AddDailyExpensesPage {
  animateClass:any;
  animate2Class:any;
  dailyExpenses:FormGroup;
  dailyExpensesCate:any;
  paymentCate:any;

  dailyExpensesList:any;

  moneyPerDay:number;

  options:CameraOptions;
  images:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public dailyExpCate: CateDailyExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public dailyExpenses_: DailyExpensesProvider,
              public camera:Camera,
              public sumIncome: SumIncomeProvider,
              public sumDailyExpenses: SumDailyExpensesProvider,
              public sumFixedExpenses: SumFixedExpensesProvider,
              public alertCtrl: AlertController,
              public addDailyExp: AddDailyExpensesProvider,
              public actionSheetCtrl: ActionSheetController,
              public loading: LoadingProvider
            ) {

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
                this.dailyExpenses_.getDailyExpenses().then(data => {
                  this.dailyExpensesList = data;
                })

                this.sumIncome.getSumIncome().then((data:SumIncome) => {
                  let income =JSON.stringify(data.totalIncome);
                  sessionStorage.setItem("income",income);
                })
            
                this.sumFixedExpenses.getSumFixedExpenses().then((data:SumFixedExp) => {
                  let fixed =JSON.stringify(data.totalFixedExp);
                  sessionStorage.setItem("fixed",fixed);
                })
            
                this.sumDailyExpenses.getSumDailyExpenses().then((data:SumDaileExp) => {
                  let daily =JSON.stringify(data.totalDailyExp);
                  sessionStorage.setItem("daily",daily);
                })

                this.checkMoney();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDailyExpensesPage');
    this.checkMoney();

    this.animateClass = { 'fade-in-item': true };

    this.animate2Class = { 'fade-in-item2': true };
    this.form();

    this.dailyExpCate.getCateDailyExpenses().then(data => {
      this.dailyExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })
  }

  checkMoney(){
    let income = JSON.parse(sessionStorage.getItem("income"));
    console.log("income======",income);
    let fixed = JSON.parse(sessionStorage.getItem("fixed"));
    console.log("fixed======",fixed);
    let daily = JSON.parse(sessionStorage.getItem("daily"));
    console.log("daily======",daily);

    let moneyPerDay = (income - fixed - daily ) /30;
    console.log("moneyPerDay======",moneyPerDay);

   
    let amount = this.dailyExpenses.controls['amount'].value;
    console.log("amount======",amount);
    
    if(amount > moneyPerDay){
      this.alertMoneyPerDay();
    }
    if(amount < 0){
      this.alert2();
    }
  }

  alertMoneyPerDay(){

      let alert = this.alertCtrl.create({
        title: 'ขออภัย!',
        subTitle: 'คุณใช้เงินเกินวงเงินที่ใช้ได้ต่อวัน อาจส่งผลกระทบต่อแผนการเงินของคุณ',
        buttons: ['ปิด']
      });
      alert.present();
  }
  alert2(){

    let alert = this.alertCtrl.create({
      title: 'ขออภัย!',
      subTitle: 'ห้ามกรอกจำนวนติดลบ',
      buttons: ['ปิด']
    });
    alert.present();

  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;
    
    this.dailyExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      daily_expenses_cate_id:[null,Validators.compose([Validators.required])],
      payment_channel_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],
    })
  }

  addDailyExpenses(dailyExpenses:DailyExpenses){
    console.log(dailyExpenses);
    
    this.addDailyExp.AddDailyExpenses(this.dailyExpenses.value);

    if(dailyExpenses != null){
      this.addDailyExpensesSuccess();

      this.navCtrl.setRoot('AddDailyExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addDailyExpensesSuccess() {
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
    this.loading.Loading();
    let file =  storage().ref().child('images3/'+name+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.images = url;
      this.dailyExpenses.controls['images'].setValue(url);
      console.log('Url :',url);
      // this.presentToast('Url :'+url);
      
    });
  }
  editDailyExpenses(item) {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          icon: 'eye',
          text: 'รายละเอียด',
          handler: () => {
            this.navCtrl.push('DetailDailyExpensesPage',item)
          }
        },
        {
          icon: 'create',
          text: 'แก้ไข',
          handler: () => {
            this.navCtrl.push('EditDailyExpensesPage',item)
          }
        },
        {
          icon: 'close-circle',
          text: 'ยกเลิก',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  HomePage(){
    this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
  }

  

}
