import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFixedExpensesPage } from './add-fixed-expenses';

@NgModule({
  declarations: [
    AddFixedExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFixedExpensesPage),
  ],
})
export class AddFixedExpensesPageModule {}
