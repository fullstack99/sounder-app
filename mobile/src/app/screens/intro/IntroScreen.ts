import {Mesh, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry, SphereGeometry, Texture} from 'three';
import {TweenMax, Power1, TimelineLite, Bounce} from 'gsap';
import {Screen} from '../Screen';
import {IGameState} from '../../../../../common';
import {ScreenManager} from '../ScreenManager';
import {Assets} from '../../utils/Assets';
import {IApp} from '../../utils/IApp';
import {promisifyAnimation, visibleWidthAtZDepth} from '../../utils';
import {MiniSignalBinding} from 'mini-signals';
import {api} from '../../utils/APIService';

export class IntroScreen extends Screen {
    private _ball: Mesh;
    private _title: Mesh;
    private readonly _binding: MiniSignalBinding;

    constructor(app: IApp) {
        super(app);
        this.showLogo();
    }

    private showLogo(): void {
        const texture = Assets.getTexture('assets/images/logo.png');
        const material = new MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x050505,
            shininess: 50,
            map: texture,
        });

        const geometry = new SphereGeometry(2, 32, 16);

        // modify UVs to accommodate MatCap texture
        const faceVertexUvs = geometry.faceVertexUvs[0];
        for (let i = 0; i < faceVertexUvs.length; i++) {
            const uvs = faceVertexUvs[i];
            const face = geometry.faces[i];

            for (let j = 0; j < 3; j++) {
                uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
                uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
            }
        }

        this._ball = new Mesh(geometry, material);
        this._ball.scale.set(0.1, 0.1, 0.1);
        this._ball.castShadow = true;
        this.add(this._ball);

        const timeline = new TimelineLite();
        timeline.to(this._ball.scale, 2, {x: 1, y: 1, z: 1, ease: Bounce.easeOut});
        timeline.to(this._ball.position, 1, {y: 4, ease: Power1.easeInOut});
        timeline.to(this._ball.rotation, 1, {x: 0.1 * Math.PI, ease: Power1.easeInOut}, 2);
    }

    public async destroy(): Promise<void> {
        if (this._binding) {
            this._binding.detach();
        }

        TweenMax.killAll();
        const promises = [];

        if (this._ball) {
            promises.push(promisifyAnimation(TweenMax.to(this._ball.position, 1, {y: 10, ease: Power1.easeIn})));
        }

        if (this._title) {
            promises.push(promisifyAnimation(TweenMax.to(this._title.position, 1, {y: -10, ease: Power1.easeIn})));
        }

        await Promise.all(promises);

        return super.destroy();
    }
}
