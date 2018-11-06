import {Scene} from 'three';
import {Screen} from './Screen';
import {IApp} from '../utils/IApp';

export class ScreenManager {
    private static _app: IApp;
    private static _current: Screen;
    private static _scene: Scene;

    public static init(app: IApp, scene: Scene): void {
        ScreenManager._app = app;
        ScreenManager._scene = scene;
    }

    public static async show<T extends Screen>(
        constructorFn: new (app: IApp, data?: any) => Screen,
        data?: any): Promise<void> {
        // if (ScreenManager._current) {
        //     await ScreenManager._current.destroy();
        //     ScreenManager._scene.remove(ScreenManager._current);
        // }

        // ScreenManager._current = new constructorFn(ScreenManager._app, data);
        // ScreenManager._scene.add(ScreenManager._current);
        // await ScreenManager._current.load();
    }
}
