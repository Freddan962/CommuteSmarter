import { Component } from '@angular/core';

import { MorePage } from '../more/more';
import { EventsPage } from '../events/events';
import { MapPage } from '../map/map';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab0Root = MapPage;
  tab1Root = EventsPage;
  tab2Root = MorePage;

  constructor() {
  }
}
