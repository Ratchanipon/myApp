import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpensesDebtByMonthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ExpensesDebtProvider Provider');
  }

  getExpensesDebtByMonth(month){                          // ดึงข้อมูลรายการรายจ่ายที่ก่อให้เกิดหนี้
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");     
    


    return new Promise(resolve=>{
        this.http.get(host+'/services/summary/getExpensesDebt?user_id='+user_id+'&month='+month)
        .subscribe(data=>{
        resolve(data);      
        console.log('ExpensesDebt++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
