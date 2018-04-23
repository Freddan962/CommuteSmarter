import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionselectorPage } from './positionselector';

@NgModule({
  declarations: [
    PositionselectorPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionselectorPage),
  ],
})
export class PositionselectorPageModule {}
