import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataChart } from '../../model/dataChart';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class DataChartProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataChartProvider Provider');
  }

  getDataChart(){                   
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host"); 

    //เดือนปัจจุบัน
    let month_n = parseInt(sessionStorage.getItem("month"));
    let month = month_n+1;

    return new Promise<DataChart>(resolve=>{
        this.http.get(host+'/services/calculate/getDataChart?user_id='+user_id+'&month='+month)
        .subscribe(data=>{
        console.log('DataChartProvider++++++1',data);
        let objec = this.extacObject(data);

        resolve(objec);      
        console.log('DataChartProvider++++++2',objec);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }
  extacObject(data){
    let json = JSON.stringify(data);
    //console.log(json);
    let obj = JSON.parse(json);
    //console.log(obj);
    return obj;
  }

}
