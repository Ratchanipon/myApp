import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIncomeMainPage } from './add-income-main';

@NgModule({
  declarations: [
    AddIncomeMainPage,
  ],
  imports: [
    IonicPageModule.forChild(AddIncomeMainPage),
  ],
})
export class AddIncomeMainPageModule {}
