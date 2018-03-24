import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { DueDate } from '../../model/due-date';

/*
  Generated class for the DueDateServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DueDateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DueDateServicesProvider Provider');
  }

  AddDueDate(dueDate:DueDate){

    let host = sessionStorage.getItem("host");
    let user_id = localStorage.getItem("user_id");

    return new Promise<User>(resolve=>{
      this.http.post(host+'/AppManagement/services/dueDate/getDueDate',JSON.stringify({data:dueDate}),
      {headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')}
  )
      .subscribe(dueDate=>{
        
        let data = this.extacObject(dueDate);
        resolve(data);
      })
    });
    
    
    // return this.http.get('http://localhost/AppManagement/services/users/getUserById?username='+user.username+'&password='+user.password);
}


extacObject(data){
  let json = JSON.stringify(data);
  //console.log(json);
  let obj = JSON.parse(json);
  //console.log(obj);
  return obj;
}

}
