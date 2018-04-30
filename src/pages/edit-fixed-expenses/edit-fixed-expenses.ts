import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CateFixedExpensesProvider } from '../../providers/category-services/cate-fixed-expenses';
import { CatePaymentChannelProvider } from '../../providers/category-services/cate-payment-channel';
import { EditFixedExpensesProvider } from '../../providers/fixed-expenses-services/edit-fixed_expenses';
import { FixedExpenses } from '../../model/fixed-expenses';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage ,initializeApp } from 'firebase';

/**
 * Generated class for the EditFixedExpensesPage page.
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
  selector: 'page-edit-fixed-expenses',
  templateUrl: 'edit-fixed-expenses.html',
})
export class EditFixedExpensesPage {

  animateClass:any;
  fixedExpensesCate:any;
  paymentCate:any;
  
  fixedExpenses:FormGroup;

  data:any;

  options:CameraOptions;
  images:string="";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public fixedExpCate: CateFixedExpensesProvider,
              public paymentCate_: CatePaymentChannelProvider,
              public camera:Camera,
              public editFixedExp_: EditFixedExpensesProvider) {

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
    console.log('ionViewDidLoad AddFixedExpensesPage');
    this.animateClass = { 'fade-in-item': true };
    this.form();

    this.fixedExpCate.getCateFixedExpenses().then(data => {
      this.fixedExpensesCate = data;
    
    this.paymentCate_.getCatePaymentChannel().then(data => {
      this.paymentCate = data;
    })
    
    })

  }

  form(){
    let user_id = localStorage.getItem("user_id");
    let date = new Date;

    this.data = this.navParams.data;
    let fix_expenses_id = this.data.fix_expenses_id;
    let amount =this.data.amount;
    let created =this.data.created;
    let payment_channel_id = this.data.payment_channel_id;
    let fix_expenses_cate_id = this.data.fix_expenses_cate_id;

    this.images = this.data.images;

    this.fixedExpenses = this.formBuilder.group({
      user_id:[user_id,Validators.compose([Validators.required])],
      fix_expenses_id:[fix_expenses_id,Validators.compose([Validators.required])],
      fix_expenses_cate_id:[fix_expenses_cate_id,Validators.compose([Validators.required])],
      payment_channel_id:[payment_channel_id,Validators.compose([Validators.required])],
      amount:[amount,Validators.compose([Validators.required])],
      created:[created,Validators.compose([Validators.required])],
      images:['',Validators.compose([])]

    })

  }

  editFixedExpenses(fixedExpenses:FixedExpenses){
    console.log(fixedExpenses);
    
    this.editFixedExp_.editFixedExpenses(this.fixedExpenses.value);

    if(fixedExpenses != null){
      this.editFixedExpensesSuccess();

      this.navCtrl.setRoot('FixedExpensesPage');   
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  }

  editFixedExpensesSuccess() {
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
      this.fixedExpenses.controls['images'].setValue(url);
      console.log('Url :',url);
      this.presentToast('Url :'+url);
      
    });
  }

}
