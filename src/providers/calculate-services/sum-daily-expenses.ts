import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class SumDailyExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SumDailyExpensesProvider Provider');
  }

  getSumDailyExpenses(){                          // ดึงข้อมูลยอดรวมรายจ่ายคงที่
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host"); 

    return new Promise(resolve=>{
        this.http.get(host+'/services/calculate/getSumDailyExpenses?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('SumDailyExpenses++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
