import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CateIncomeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CateIncomeProvider Provider');
  }

  getCateIncome(){
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/category/getCateIncomeAll')
        .subscribe(data=>{
        resolve(data);      
        console.log('CateIncome++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

}
