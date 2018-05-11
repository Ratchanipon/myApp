import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeleteUserProvider {



  constructor(public http: HttpClient) {
    console.log('Hello DeleteUserProvider Provider');
  }

  deleteUser(){
      /* return new Promise(resolve=>{
      this.http.get('http://localhost/AppManagement/services/users/getUserById?username='+user.username+'&password='+user.password)
      .subscribe(data=>{
        resolve(data);      
      }, err =>{
        console.error(err);      
        });
      }); */
      let user_id = localStorage.getItem("user_id");
      let host = sessionStorage.getItem("host");

      return new Promise<User>(resolve=>{
        this.http.get(host+'/services/users/deleteUser?user_id='+user_id)
        .subscribe(user=>{

          console.log("DeleteUserProvider",user);         
          let data = this.extacObject(user);
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
