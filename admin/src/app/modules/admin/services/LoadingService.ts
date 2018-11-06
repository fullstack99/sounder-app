import {Injectable} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Injectable()
export class LoadingService {
    private _count = 0;

    constructor(private _progress: NgProgress) {
    }

    show(): void {
        if (this._count === 0) {
            this._progress.ref().start();
        }

        this._count++;
    }

    hide(): void {
        if (this._count === 0) {
            return;
        }

        this._count--;

        if (this._count === 0) {
            setTimeout(this.innerHide.bind(this), 100);
        }
    }

    wrap(promise: Promise<any>): Promise<any> {
        this.show();
        return promise.then(result => {
            this.hide();
            return result;
        }, error => {
            this.hide();
            throw error;
        });
    }

    private innerHide(): void {
        if (this._count === 0) {
            this._progress.ref().complete();
        }
    }
}
