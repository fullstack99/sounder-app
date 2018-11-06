import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

const net = eRequire('electron').remote.require('net');

@Injectable()
export class TCPService extends Subject<void> {
    private _server: any;
    private _clients: any[] = [];

    constructor() {
        super();
        this._server = net.createServer(this.clientConnectedHandler.bind(this));
        this._server.on('error', this.serverErrorHandler.bind(this));
        this._server.listen(30938, this.serverReadyHandler.bind(this));
        window.addEventListener('beforeunload', this.destroy.bind(this));
    }

    write(data: any): void {
        data = JSON.stringify(data) + '\n';
        this._clients.forEach(client => client.write(data));
    }

    private clientConnectedHandler(client: any): void {
        console.log('TCPService: client connected');
        this._clients.push(client);
        this.next();
        client.on('end', this.clientDisconnectedHandler.bind(this, client));
    }

    private clientDisconnectedHandler(client: any): void {
        console.log('TCPService: client disconnected');
        const index = this._clients.indexOf(client);

        if (index === -1) {
            return;
        }

        this._clients.splice(index, 1);
    }

    private serverReadyHandler(): void {
        console.log('TCPService: ready, port =', 30938);
    }

    private serverErrorHandler(error: any): void {
        console.warn('TCPService: error', error);
    }

    private destroy(): void {
        this._clients.forEach(client => client.destroy());
        this._server.close(() => this._server.unref());
    }
}
