import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRegisterPage } from './edit-register';

@NgModule({
  declarations: [
    EditRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRegisterPage),
  ],
})
export class EditRegisterPageModule {}
