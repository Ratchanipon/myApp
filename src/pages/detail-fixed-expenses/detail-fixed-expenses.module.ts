import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailFixedExpensesPage } from './detail-fixed-expenses';

@NgModule({
  declarations: [
    DetailFixedExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailFixedExpensesPage),
  ],
})
export class DetailFixedExpensesPageModule {}
