import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SumDispensableExpensesByMonthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SumDispensableExpensesByMonthProvider Provider');
  }

  getSumDispensableExpensesByMonth(month){                          // ดึงข้อมูลรายการรายจ่ายที่ไม่จำเป็น
    let user_id = localStorage.getItem("user_id");  
    let host = sessionStorage.getItem("host");   
    
    

    return new Promise(resolve=>{
        this.http.get(host+'/services/summary/getSumDispensableExpenses?user_id='+user_id+'&month='+month)
        .subscribe(data=>{
        resolve(data);      
        console.log('SumDispensableExpensesByMonth++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
