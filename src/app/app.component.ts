import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DispensableExpensesPage } from '../pages/dispensable-expenses/dispensable-expenses';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "FhcInstantPage";

  pages: Array<{title: string, component: any}>;

  email: string;    
  
  date = new Date;
  month = this.date.getMonth().toString();
  year = this.date.getFullYear().toString();

  // host: string = "http://anusit-not.esy.es/AppManagement";
  host: string = "http://localhost/AppManagement";
  // host: string = "http://chinhosting.com/web/AppManagement"
  

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public actionSheetCtrl: ActionSheetController,
              public splashScreen: SplashScreen) {
                
        sessionStorage.setItem("host",this.host);
        sessionStorage.setItem("month",this.month);
        sessionStorage.setItem("year",this.year);
    // localStorage.setItem("host",this.host);

    this.user_id = localStorage.getItem("user_id");
    this.user_id != null?this.rootPage = "HomePage":this.rootPage = "IndexPage";

    this.email = localStorage.getItem("email");

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ภาพรวม', component: 'HomePage' },
      // { title: 'List', component: 'ListPage' },
      { title: 'รายรับ', component: 'IncomePage'},
      { title: 'รายจ่ายรายวัน', component: 'DailyExpensesPage'},
      { title: 'รายจ่ายคงที่', component: 'FixedExpensesPage'},
      { title: 'สรุป', component: 'SummaryPage'}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.email = localStorage.getItem("email");

      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.rootPage= page.component;
  }

  logOut1() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'exit',
          text: 'ออกจากระบบ',
          handler: () => {
            localStorage.clear();
            this.rootPage = "IndexPage";
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

}
