import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelExpensesPage } from './channel-expenses';

@NgModule({
  declarations: [
    ChannelExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelExpensesPage),
  ],
})
export class ChannelExpensesPageModule {}
