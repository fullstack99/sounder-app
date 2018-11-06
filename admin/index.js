const SHOW_GAME_WINDOW = true;
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const admin = require('firebase-admin');

require('electron-debug')({
    enabled: true,
    showDevTools: false,
});

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'game-changer-interactive',
      clientEmail: 'firebase-adminsdk-og12l@game-changer-interactive.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwqtIVQ3xdV2i3\nFh4NzYYP8chDgbBmBkFRNrriYhCoGKwFLghjpU8Zex9ZzPW9NKdtvnsMOPBFqsEF\nx/XE38b/eGiJK6CBzvUgDaHzRQC5c0lz9DuAi00+mC01BcAApMSqv08TnBGw6+J6\nyOnEyhOPERx7qQ+1ZDC7/fQu9i2iFkpn0CxtvfWeJQRNziy0ihY0nQXtUdosIXmZ\nMXMVCdl4rvbSZBMGX0w5PHwqzDlYnbOLIx3vzlVz0bb+byOsO/UgnsHXVg4eAgIK\nvs+VgGQlmpw7vjcLtFu6QpTAMcS4YYJFJvlFVR7+7abUExuZyc+oN32bqn+PXQkE\n0gq6hzzBAgMBAAECgf8173DD3R6SwKTPgIkcXaqYI5CoS2e3PiGi0bqscpPzPdUG\nn88f3NART2161QARC4oyDv0x9hAktMTJJwr5V/hA9lmzxwXxm2Vqq77NrjtSYsgC\nBoZD8ENc4Misb1z21VbVaiKSMguUn+883SnBUpA2FVtExZBuKHBYdGegDrhPy0vC\n5bgGK9eql0IDxizQrFfZ3+snoAsapJgx7iE3OQcrMlVZ5zyUfR8V1nwy5pZZQHkp\nWUxEga4IB4GWQwRWrpkckwExFOfdnLcbhH2nvc0RE0Iw0JgDH+Ao6bG/V/QwBbV4\nCf1Evo7ULW+VcVzWKIPBgop+M/2Klr2eKXwg/yECgYEA7LLkrpp+N/1k8Ues4KL0\nzettvqVzuN7Qo4RTWV6+1WWwvJqrsb8EmQuzOUf0wb8mMTC6G0dQc+Kw7FAMeZ42\nYoj6Olk3/+biL5yYH2J672ZKrPHPGVo9g9f20C/SDjjroxqnLXiwiNGEMjv8DaNw\nj1xv2MuIhCUAorZ5VseofSECgYEAvxLDou6HhahWsBs2rsHu1v9IzclPnIII125Z\nz/HwjRQzwRKbiL3dQ6vGppDrNN0J9EFnMsuGWC3fDniwuyCC3N1L6jeDlWZA0tY0\nSXqg4MAggC1XGipaCdM5t/XkbWnw1koilNlJVsg6A9wlj3Pf7mIDeP5rHvPGPHsW\nwR8MK6ECgYEAimgpFHg+ahr/1Z6l1k0zfN23tI0m1+licttDqbSfPkVSTVbcIvmh\nhKS0zj/nPQu7F3R4vs66mqjp76T3Rn5fKssSFuBowHiPtmuJAIEjha146RwUj6yW\n3+t+5UmxOKPMFfnV298Ay2BIPt+YiZkSjqHsvQZ28153uq2c0kO5oEECgYEAurnt\nslaE3luKjAOsRtCDRlyom2L2iC6T0WSoJI191YE+qpoyoUla6H0AX1sUYM76oVch\nMQSwv4/kglHz9ItrF8i0Haouz1vkUaa/5mcOvVVE7b5hdtKYty1TJLIKj9qOX/yH\nGwvVnheCiq8jjbNhzaa/WgjYSqFUw1pO/GAJFsECgYAD1CCz1DhXPZ1FWT9keqzS\nfiawY9L45O5M7KvwvRym/Qab84RBukecEmfy+idwOhlIjwPXHrHBO7M9NwrDlSjQ\n+aU6tgqtC9vW66BxQChDZa1VD7TBUy/91m6gSFtUlXIx8MBbd1n8yywiuzHbPUIo\nsqKTlkUamIHmVyhTlLn4mA==\n-----END PRIVATE KEY-----\n'
    }),
    databaseURL: 'game-changer-interactive.firebaseio.com'
});

app.on('ready', appReadyHandler);
app.on('window-all-closed', close);

function appReadyHandler() {
    let basePath;

    if (process.env['GC_DEVELOPMENT'] === 'true') {
        basePath = 'http://localhost:4200/#/';
    } else {
        basePath = 'file://' + __dirname + '/www/index.html#/';
    }

    let w = new BrowserWindow({width: 1280, height: 800});
    w.loadURL(basePath + 'admin');
    w.on('closed', close);

    if (!SHOW_GAME_WINDOW) {
        return;
    }
}

function close() {
    app.quit()
}
