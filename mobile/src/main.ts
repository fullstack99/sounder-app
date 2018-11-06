import './styles.scss';
import {App} from './app/App';
import {isIOS, isCordova} from './app/utils';
import {BRANCH} from '../../common';

// to make click events work on iOS
if (isIOS()) {
    document.body.style.cursor = 'pointer';
}

const app = new App();

if (!isElectron()) {
    checkCordova();
}

function checkCordova(): void {
    if (!isCordova()) {
        setTimeout(checkCordova, 500);
    } else {
        initializeCordovaServices();
    }
}

function initializeCordovaServices(): void {
    document.addEventListener('deviceready', () => {
        initPushNotifications();
    });
}

function initPushNotifications() {
    if (!window['FirebasePlugin']) {
        console.warn('firebase plugin unavailable');
        return;
    }
    window['FirebasePlugin'].getToken(token => {
        // save this server-side and use it to push notifications to this device
        // tslint:disable-next-line:no-console
        console.log('push notifications token', token);
        const result = window['FirebasePlugin'].subscribe(`shiny-blast-${BRANCH}`);
        // tslint:disable-next-line:no-console
        console.log('subscribe result', result, `shiny-blast-${BRANCH}`);
    }, error => {
        console.warn('push notifications error', error);
    });
}

function isElectron(): boolean {
    return window && window['process'] && window['process'].type;
}
