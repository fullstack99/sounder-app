import {Injectable} from '@angular/core';
import {BRANCH} from '../../../../../../common';

const admin = eRequire('electron').remote.require('firebase-admin');

@Injectable()
export class PushService {
    async send(message: string): Promise<void> {
        const payload = {
            notification: {
                body: message,
                title: 'Sound App',
            },
            topic: `shiny-blast-${BRANCH}`,
        };
        console.log('PushService.send', payload);
        return admin.messaging().send(payload)
            .then(result => console.log('PushService.push result', result), error => console.warn('PushService.push error', error));
    }
}
