import {Component} from '@angular/core';
import {gcFirebase} from '@gamechanger/gc-firebase';
import {Router} from '@angular/router';
import {APIService} from './services/APIService';
import {IGameState} from '../../../../../common';

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
    constructor(private _router: Router, private _api: APIService) {
        this.init();
    }

    private async init(): Promise<void> {
        await this._api.login();
        this._api.subscribe(this.stateHandler.bind(this));

    }

    private stateHandler(value: IGameState): void {
        this._router.navigate(['admin', 'control']);
    }
}
