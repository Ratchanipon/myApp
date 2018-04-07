import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditFixedExpensesPage } from './edit-fixed-expenses';

@NgModule({
  declarations: [
    EditFixedExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditFixedExpensesPage),
  ],
})
export class EditFixedExpensesPageModule {}
