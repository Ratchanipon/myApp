import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddIncomeProvider } from '../../providers/income-services/add-income';
import { CateIncomeProvider } from '../../providers/category-services/cate-icome';
import { Income } from '../../model/income';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';
import { IncomeProvider } from '../../providers/income-services/income';
import { initializeApp } from 'firebase/app';
import { FirebaseConfig } from '../../app/firebae-Config';
import { LoadingProvider } from '../../providers/loading/loading';
import { DeleteIncomeProvider } from '../../providers/income-services/delete-income';
import { ToastProvider } from '../../providers/toast/toast';
// import { config } from '../../app/app.module';
/**
 * Generated class for the AddIncomeMainPage page.
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
  selector: 'page-add-income-main',
  templateUrl: 'add-income-main.html',
})
export class AddIncomeMainPage {

  [x: string]: any;
  incomeCateList:any;
  income:FormGroup;

  animateClass:any;
  animate2Class:any;

  options:CameraOptions;

  images:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public addIncom_: AddIncomeProvider,
              public incomeCate: CateIncomeProvider,
              public income_2: IncomeProvider,
              public camera:Camera,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public loading: LoadingProvider,
              public deleteIncome: DeleteIncomeProvider,
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
                this.income_2.getIncome().then((data:Income) => {
                  this.incomeList = data;
        
            })       

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddIncomeMainPage');
    // this.animateClass = { 'fade-in-item': true };

    this.animate2Class = { 'fade-in-item2': true };
    this.form();

    this.incomeCate.getCateIncome().then(data => {
      this.incomeCateList = data;
    })
  }

  checkMoney(){

    let amount = this.income.controls['amount'].value;
    console.log("amount======",amount);
    
    if(amount < 0){
      this.alert2();
      this.navCtrl.push('AddIncomeMainPage');
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

      this.navCtrl.setRoot('AddIncomeMainPage');   
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
        let m = new Date().getMonth().toString();
        let y = new Date().getFullYear().toString();
        let t = new Date().getTime().toString();

        let name = d+m+y+t ;
        
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/'+name+'.jpg');
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
    let file =  storage().ref().child('images/'+name+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.images = url;
      this.income.controls['images'].setValue(url);
      console.log('Url :',url);
      // this.presentToast('Url :'+url);
      
    });
  }
  editIncome(item) {
    let actionSheet = this.actionSheetCtrl.create({
      
      buttons: [
        {
          icon: 'eye',
          text: 'รายละเอียด',
          handler: () => {
            console.log(item.income_cate_id);
            this.navCtrl.push('DetailIncomePage',item)
          }
        },
        {
          icon: 'create',
          text: 'แก้ไข',
          handler: () => {
            console.log(item.income_cate_id);
            this.navCtrl.push('EditIncomePage',item)
          }
        },
        {
          icon: 'trash',
          text: 'ลบ',
          handler: () => {
            let income_id = item.income_id;
            this.DeleteConfirm(income_id);
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

  DeleteConfirm(income_id) {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการจะลบรายรับนี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.deleteIncome.DeleteIncome(income_id);
            this.toast.ToastService('ลบรายการสำเร็จ');
            this.navCtrl.push('AddIncomeMainPage');
            // this.navCtrl.setRoot('AddIncomeMainPage');   
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
