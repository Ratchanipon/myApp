import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SumIncomeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SumIncomeProvider Provider');
  }

  getSumIncome(){                                    // ดึงข้อมูลยอดรวมรายรับ
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host"); 
    
    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/calculate/getSumIncome?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('Balance++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
