import {Component, OnDestroy} from '@angular/core';
import {
    ICardData, IGameData, IGameState
} from '../../../../../../../common';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {APIService} from '../../services/APIService';
import {Subscription} from 'rxjs';

@Component({
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.scss'],
    animations: [
        trigger('flipState', [
            state('inactive', style({
                transform: 'rotateY(0)'
            })),
            state('active', style({
                transform: 'rotateY(180deg)'
            })),
            transition('active => inactive', animate('250ms ease-out')),
            transition('inactive => active', animate('250ms ease-out'))
        ])]
})
export class ControlComponent implements OnDestroy {
    isStarted = false;
    enable = false;
    message: string;

    private _flippedCards: ICardData[] = [];
    private _timer: number;
    private readonly _subscription: Subscription;

    constructor(
        private _sanitizer: DomSanitizer,
        private _api: APIService) {
            this.isStarted = false;
        this._api.startGame({
            isStarted: false,
            message: ''
        });
    }

    async buttonStartGameHandler(): Promise<void> {
        console.log('message', this.message);
        this.isStarted = !this.isStarted;
        const data = {
            isStarted: this.isStarted,
            message: this.message
        };
        await this._api.startGame(data);
    }

    ngOnDestroy(): void {
        this._api.startGame({
            isStarted: false,
            message: ''
        });
        this._subscription.unsubscribe();
    }
}
