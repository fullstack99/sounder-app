import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';

import {TCPService} from './services/TCPService';
import {ControlComponent} from './components/control/control.component';
import {PushService} from './services/PushService';
import {FormsModule} from '@angular/forms';
import {AdminComponent} from './admin.component';
import {NgProgressModule} from '@ngx-progressbar/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AdminRoutes} from './admin.routes';
import {APIService} from './services/APIService';
import {LoadingService} from './services/LoadingService';

@NgModule({
    declarations: [
        AdminComponent,
        ControlComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgProgressModule,
        BrowserAnimationsModule,
        AdminRoutes,
        UiSwitchModule,
        NgProgressModule.forRoot(),
    ],
    providers: [
        PushService,
        TCPService,
        APIService,
        LoadingService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ]
})
export class AdminModule {
}
