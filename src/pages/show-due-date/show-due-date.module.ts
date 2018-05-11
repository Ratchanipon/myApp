import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowDueDatePage } from './show-due-date';

@NgModule({
  declarations: [
    ShowDueDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ShowDueDatePage),
  ],
})
export class ShowDueDatePageModule {}
