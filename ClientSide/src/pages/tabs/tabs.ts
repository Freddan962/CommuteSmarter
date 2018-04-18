import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MorePage } from '../more/more';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MapPage;
  tab6Root = MorePage;

  constructor() {

  }
}
