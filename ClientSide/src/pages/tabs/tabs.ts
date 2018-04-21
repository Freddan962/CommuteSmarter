import { ContactPage } from './../contact/contact';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MorePage } from '../more/more';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab5Root = EventsPage;
  tab4Root = MapPage;
  tab6Root = MorePage;

  constructor() {

  }
}
