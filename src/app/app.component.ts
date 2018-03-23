import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
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
  
  // host: string = "http://172.20.10.2";
  host: string = "http://localhost";

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
                
        sessionStorage.setItem("host",this.host);
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
      { title: 'สรุปรายจ่ายที่ไม่จำเป็น', component: 'DispensableExpensesPage'},
      { title: 'สรุปรายจ่ายแต่ละช่องทาง', component: 'ChannelExpensesPage'},
      { title: 'อันดับรายจ่ายสูงสุด', component: 'MaxExpensesPage'},
      { title: 'สรุปรายจ่ายที่ก่อให้เกิดหนี้สิน', component: 'ExpensesDebtPage'},
      { title: 'สรุปรายรับที่ก่อให้เกิดหนี้สิน', component: 'IncomeDebtPage'}
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

  logOut(){
    localStorage.clear();
    this.rootPage = "LoginPage";
  }

}
