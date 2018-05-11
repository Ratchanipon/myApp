import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDueDatePage } from './edit-due-date';

@NgModule({
  declarations: [
    EditDueDatePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDueDatePage),
  ],
})
export class EditDueDatePageModule {}
