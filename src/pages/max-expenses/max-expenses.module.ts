import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaxExpensesPage } from './max-expenses';

@NgModule({
  declarations: [
    MaxExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(MaxExpensesPage),
  ],
})
export class MaxExpensesPageModule {}
