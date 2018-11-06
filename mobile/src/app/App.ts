import * as PleaseRotate from './utils/pleaserotate.js';
import {
    Mesh, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, Raycaster, Renderer, Scene,
    ShadowMaterial,
    SpotLight, Vector2,
    WebGLRenderer,
} from 'three';

import { Object3D } from 'three';
import { IntroScreen } from './screens/intro/IntroScreen';
import { ScreenManager } from './screens/ScreenManager';
import { config } from './App.config';
import { IApp } from './utils/IApp';
import { LoadingOverlay } from './utils/LoadingOverlay';
import { MainMenuDialog } from '@gamechanger/gc-modals';
import { api } from './utils/APIService';

export class App implements IApp {
    private _renderer: Renderer;
    private _scene: Scene;
    private _camera: PerspectiveCamera;
    private _animate: any;
    private _raycaster = new Raycaster();
    private _mouse = new Vector2();
    private _initialized: boolean;

    constructor() {
        PleaseRotate.start({
            forcePortrait: true,
            allowClickBypass: false,
            subMessage: '',
        });

        this.load();
    }

    private async load(): Promise<void> {
        await LoadingOverlay.wait();
        this.orientationChangedHandler();
    }

    private orientationChangedHandler(event?: Event): void {
        if (window.innerHeight > window.innerWidth) {
            this.initialize();
        } else if (!event) {
            window.addEventListener('resize', this.orientationChangedHandler.bind(this));
        }
    }

    private async initialize(): Promise<void> {
        if (this._initialized) {
            return;
        }

        this._initialized = true;
        await api.login();
        ScreenManager.init(this, this._scene);
        ScreenManager.show(IntroScreen);
    }

    get camera(): PerspectiveCamera {
        return this._camera;
    }
}
