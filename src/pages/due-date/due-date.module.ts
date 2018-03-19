import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DueDatePage } from './due-date';

@NgModule({
  declarations: [
    DueDatePage,
  ],
  imports: [
    IonicPageModule.forChild(DueDatePage),
  ],
})
export class DueDatePageModule {}
