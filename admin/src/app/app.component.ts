import {Component} from '@angular/core';
import {BRANCH, BUILD_NUM} from '../../../common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor() {
        console.log(`%c Sound App, ${BRANCH}, version ${BUILD_NUM}`, 'background: #222; color: #bada55');
    }
}
