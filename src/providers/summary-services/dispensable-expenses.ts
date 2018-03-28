import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DispensableExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DispensableExpensesProvider Provider');
  }

  getDispensableExpenses(){                          // ดึงข้อมูลรายการรายจ่ายที่ไม่จำเป็น
    let user_id = localStorage.getItem("user_id");  
    let host = sessionStorage.getItem("host");                           

    return new Promise(resolve=>{
        this.http.get(host+'/services/summary/getDispensableExpenses?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('DispensableExpenses++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
