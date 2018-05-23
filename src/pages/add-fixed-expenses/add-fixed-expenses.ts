import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CateFixedExpensesProvider } from '../../providers/category-services/cate-fixed-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { FixedExpenses } from '../../model/fixed-expenses';
import { AddFixedExpensesProvider } from '../../providers/fixed-expenses-services/add-fixed_expenses';

import { FixedExpensesProvider } from '../../providers/fixed-expenses-services/fixed-expenses';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FirebaseConfig } from '../../app/firebae-Config';
import { LoadingProvider } from '../../providers/loading/loading';
import { DeleteFixedExpensesProvider } from '../../providers/fixed-expenses-services/delete-fixed_expenses';
import { ToastProvider } from '../../providers/toast/toast';

// import { initializeApp } from 'firebase/app';

/**
 * Generated class for the AddFixedExpensesPage page.
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
  selector: 'page-add-fixed-expenses',
  templateUrl: 'add-fixed-expenses.html',
})
export class AddFixedExpensesPage {

  animateClass:any;
  animate2Class:any;
  iconClass:any;
  fixedExpensesCate:any;
  paymentCate:any;
  
  fixedExpenses:FormGroup;
  fixedExpensesList:any;

  images:string="";
  options:CameraOptions;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public camera:Camera,
              public toastCtrl: ToastController,
              public fixedExpCate: CateFixedExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public fixedExpenses_: FixedExpensesProvider,
              public addFixedExp: AddFixedExpensesProvider,
              public actionSheetCtrl: ActionSheetController,
              public loading: LoadingProvider,
              public deleteFixExp: DeleteFixedExpensesProvider,
              public toast: ToastProvider
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
                this.fixedExpenses_.getFixedExpenses().then(data => {
                  this.fixedExpensesList = data;
                  console.log(this.fixedExpensesList);
                  
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFixedExpensesPage');
    // this.animateClass = { 'fade-in-item': true };

    this.animate2Class = { 'fade-in-item2': true };
    // this.iconClass = {'material-icons' : true};

    this.form();

    this.fixedExpCate.getCateFixedExpenses().then(data => {
      this.fixedExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })

  }

  checkMoney(){

    let amount = this.fixedExpenses.controls['amount'].value;
    console.log("amount======",amount);
    
    if(amount < 0){
      this.alert2();
      this.navCtrl.push('AddFixedExpensesPage');
    }
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
    
    this.fixedExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      fix_expenses_cate_id:[null,Validators.compose([Validators.required])],
      payment_channel_id:[null,Validators.compose([Validators.required])],
      amount:[null,Validators.compose([Validators.required])],
      created:[null,Validators.compose([Validators.required])],
      images:['',Validators.compose([])]

    })

  }

  addFixedExpenses(fixedExpenses:FixedExpenses){
    console.log(fixedExpenses);
    
    this.addFixedExp.AddFixedExpenses(this.fixedExpenses.value);

    if(fixedExpenses != null){
      this.addFixedExpensesSuccess();

      this.navCtrl.setRoot('AddFixedExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  addFixedExpensesSuccess() {
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
        const picture = storage().ref().child('images2/'+name+'.jpg');
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
    let file =  storage().ref().child('images2/'+name+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.images = url;
      this.fixedExpenses.controls['images'].setValue(url);
      console.log('Url :',url);
      // this.presentToast('Url :'+url);
      
    });
  }
  editFixedExpenses(item) {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          icon: 'eye',
          text: 'รายละเอียด',
          handler: () => {
            this.navCtrl.push('DetailFixedExpensesPage',item)
          }
        },
        {
          icon: 'create',
          text: 'แก้ไข',
          handler: () => {
            console.log(item.category);
            this.navCtrl.push('EditFixedExpensesPage',item)
          }
        },
        {
          icon: 'trash',
          text: 'ลบ',
          handler: () => {
            let fix_expenses_id = item.fix_expenses_id;
            this.DeleteConfirm(fix_expenses_id);
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

  DeleteConfirm(fix_expenses_id) {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการจะลบรายจ่ายคงที่นี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.deleteFixExp.DeleteFixedExpenses(fix_expenses_id);
            this.toast.ToastService('ลบรายการสำเร็จ');
            this.navCtrl.push('AddFixedExpensesPage');
            // this.navCtrl.setRoot('AddFixedExpensesPage');   
            // const root = this.app.getRootNav();
            // root.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

  HomePage(){
    this.navCtrl.setRoot('HomePage');   
      const root = this.app.getRootNav();
      root.popToRoot();
  }

  
}
