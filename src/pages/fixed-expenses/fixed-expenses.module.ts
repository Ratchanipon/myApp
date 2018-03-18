import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedExpensesPage } from './fixed-expenses';

@NgModule({
  declarations: [
    FixedExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedExpensesPage),
  ],
})
export class FixedExpensesPageModule {}
