import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoneyPerDayByMonthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MoneyPerDayProvider Provider');
  }

  getMoneyPerDayByMonth(month){                                    // ดึงข้อมูลจำนวนเงินที่ใช้ได้ต่อวัน
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host"); 

  

    return new Promise(resolve=>{
        this.http.get(host+'/services/calculate/getMoneyPerDay?user_id='+user_id+'&month='+month)
        .subscribe(data=>{
        resolve(data);      
        console.log('MoneyPerDayProvidere++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
