import {Group} from 'three';
import {IApp} from '../utils/IApp';

export class Screen extends Group {
    constructor(protected _app: IApp, data?: any) {
        super();
    }

    public load(): Promise<void> {
        return Promise.resolve();
    }

    public destroy(): Promise<void> {
        this._app = null;
        return Promise.resolve();
    }
}
