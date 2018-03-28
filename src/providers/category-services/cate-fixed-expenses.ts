import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CateFixedExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CateFixedExpensesProvider Provider');
  }

  getCateFixedExpenses(){
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/services/category/getCateFixedExpensesAll')
        .subscribe(data=>{
        resolve(data);      
        console.log('CateFixedExpenses++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
