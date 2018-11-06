import {gcFirebase} from '@gamechanger/gc-firebase';
import {BRANCH, GAME_ID, IGameState} from '../../../../common';
import * as MiniSignal from 'mini-signals';
import {MiniSignalBinding} from 'mini-signals';
import {LoginDialog} from '@gamechanger/gc-modals';

class APIService extends MiniSignal {
    private _isStateSynced: boolean;
    private _state: IGameState;

    public async login(): Promise<void> {
        await gcFirebase.init({
            gameId: GAME_ID,
            clientId: BRANCH,
        });

        await LoginDialog.loginAnonymously();

        gcFirebase.games.watchState(value => {
            this._state = value;
            const div = document.getElementById('text-content');
            div.innerHTML = value.message;
            const _this = this;
            const audioPlayer = document.getElementById('myAudio') as HTMLMediaElement;
            if (this._state.isStarted) {
                audioPlayer.play();
            } else if (this._state.isStarted === false) {
                audioPlayer.pause();
            }
            this._isStateSynced = true;
            this.dispatch(value);
        });

    }

    public add(fn: (value: IGameState) => void): MiniSignalBinding {
        if (this._isStateSynced) {
            requestAnimationFrame(fn.bind(null, this._state));
        }

        return super.add(fn, null);
    }

}

export const api = new APIService();
