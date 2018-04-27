import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { filterMap } from './filterMap';

@NgModule({
  declarations: [
    filterMap,
  ],
  imports: [
    IonicPageModule.forChild(filterMap),
  ],
})
export class filterMapPageModule {}
