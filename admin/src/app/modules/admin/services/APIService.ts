import {Injectable, NgZone} from '@angular/core';
import {gcFirebase, IGCFileData} from '@gamechanger/gc-firebase';
import {BRANCH, GAME_ID, IGameData, IGameState} from '../../../../../../common';
import {LoadingService} from './LoadingService';
import {BehaviorSubject} from 'rxjs';
import {TCPService} from './TCPService';
import * as firebase from 'firebase';

@Injectable()
export class APIService extends BehaviorSubject<IGameState> {
    private _gameState: IGameState;
    private _isStateSynced: boolean;

    constructor(
        private _loading: LoadingService,
        private _zone: NgZone,
        private _tcp: TCPService) {
        super(null);

        this._tcp.subscribe(() => {
            if (this._isStateSynced) {
                this._tcp.write(this._gameState);
            }
        });
    }

    onAuth(callback: Function): void {
        const unsubscribe = gcFirebase.auth.onAuth(() => {
            unsubscribe();
            callback();
        });
    }

    async login(): Promise<void> {
        await this._loading.wrap(gcFirebase.init({
            gameId: GAME_ID,
            clientId: BRANCH
        }));

        await this._loading.wrap(gcFirebase.auth.loginUID('Q77cvtcAgl4LgvATkFWbUG2TbO4GTS'));
        gcFirebase.games.watchState(value => {
            this._gameState = value;
            this._isStateSynced = true;
            this._tcp.write(value);
            this._zone.run(() => this.next(value));
        });
    }

    async startGame(data): Promise<void> {
        await this._loading.wrap(gcFirebase.games.updateGameState(data));
    }
}

function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
