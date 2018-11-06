import {Texture, TextureLoader} from 'three';

const textures: string[] = [
    'logo',
    'card-front',
    'card-back',
    'win',
    'title',
    'lose',
];

export class Assets {
    private static _textures: { [key: string]: Texture } = {};

    public static getTexture(url: string, onLoad?: (texture: Texture) => void): Texture {
        let result: Texture = Assets._textures[url];

        if (result == null) {
            Assets._textures[url] = result = new TextureLoader().load(url, onLoad);
        } else if (onLoad != null) {
            onLoad(result);
        }

        return result;
    }

    public static getTexturePromise(url: string): Promise<Texture> {
        return new Promise<Texture>(resolve => Assets.getTexture(url, resolve));
    }
}

for (const s of textures) {
    Assets.getTexture(`assets/images/${s}.png`);
}
