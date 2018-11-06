import {DefaultLoadingManager} from 'three';

let _progress: number = 10;
let _timer: number;

export class LoadingOverlay {
    public static async wait(): Promise<void> {
        clearTimeout(window['__timerLoadingOverlay']);
        delete window['__timerLoadingOverlay'];
        _timer = setTimeout(tick);
        await new Promise(resolve => DefaultLoadingManager.onProgress = (item, loaded, total) => {
            const p = 9 + Math.floor(loaded * 90 / total);

            if (_progress < p) {
                _progress = p;
            }

            if (loaded === total) {
                clearTimeout(_timer);
                resolve();
            }
        });

        LoadingOverlay.hide();
    }

    private static hide(): void {
        const overlay = getOverlay();

        if (overlay == null) {
            return;
        }

        document.body.removeChild(overlay);
    }
}

function tick(): void {
    const overlay = getOverlay();

    if (overlay == null || _progress === 99) {
        return;
    }

    _progress++;
    overlay.innerHTML = 'LOADING...' + _progress + '%';
    _timer = setTimeout(tick, Math.round(1000 + Math.random() * 1000));
}

function getOverlay(): HTMLElement {
    return document.querySelector('.loadingOverlay') as HTMLElement;
}
