
/********************************************************************************************************/
/* 
/* Please, take care edit this file. If You need, edit the settings file
/* 
/* Author: Wansley Nery Soto
/* 
/********************************************************************************************************/



/********************************************************************************************************/
/* Application import
/********************************************************************************************************/

// External
// *
import bodyParser from 'body-parser';
import stylus from 'stylus';
import express from 'express';
import morgan from 'morgan';
import { readFileSync } from 'fs';
import { i } from 'minimalist-logger';
import { join, dirname, resolve } from 'path';
import http from 'http';
import { readFilenames, setFileContent, getFileContent } from '../processor/fileProcessor';
import { isNullOrUndefined } from 'util';
import cookieParser from 'cookie-parser';

// Server global variables
// *

export let __root: string = dirname(require.main!.filename) || resolve(join(__dirname, '..', '..', '..'));

export const SETTINGS: any =
    JSON.parse(
        readFileSync(
            join(__root, 'settings.ini'),
            'utf8'));

const port: number = parseInt(process.env.port || SETTINGS.port, 10);
const serviceName: string = SETTINGS.service; // Service name to log inside settings file

const app = express();
let server: http.Server | null = null;
let serverRunningInstance: http.Server = new http.Server;

app.use(cookieParser(SETTINGS.secrets.cookies));

// Inner assets folder
const assetsFolder: string = join(__root, 'source', 'assets');

// Routers folder path
export const routesPath: string = join(__root, 'source', 'routes') + '\\';

export const translationUrl: string = join(__root, 'source', 'translations');
export let translationFile: any = getLanguage('en-US');
        
export default stylus;



/********************************************************************************************************/
/* Server Utilities
/********************************************************************************************************/

/**
 * Make all need settings to server
 */
export function set () {

    renderStylusInCss();

    // Error request log
    app.use(
        morgan('tiny', { skip: (_req: any, res: { statusCode: number; }) => res.statusCode < 400 }));

    // Standard headers
    app.use((_request, response, next) => {

        // const IP: string = request.ip;
        // i('[' + new Date() + '] User-Agent: ' + request.header('User-Agent') + ' from ' + IP.substr(IP.lastIndexOf(':') + 1) + '.', serviceName);

        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        response.header('Service-Request', serviceName);

        return next();

    });

    // Standard cookies
    app.use((request, response, next) => {
        let vanillaCok: any = request.signedCookies.language;

        if (isNullOrUndefined(vanillaCok)) {
            response.cookie('language', 'en-US', { signed: true, httpOnly: true, maxAge: Date.now() + (10 * 365 * 24 * 60 * 60) });
        }
        return next();
    });

    // Pug engine compiler
    app.set('view engine', 'pug');

    // Views location
    app.set('views', join(__root, 'source', 'views'));

    // Public static folder resources
    app.use('/res', express.static(join(__root, 'public')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/favicon.ico',
        express.static(
            join(__root, 'public', 'image', 'favicon.png')));

}



/**
 * Starts the server
 */
export function start () {

    // Create HTTP server
    server = http.createServer(app);

    serverRunningInstance = server.listen(port);

    server.on('listening', onListening);
    server.on('error', onError);

}



/**
 * Listen for HTTP server "error" event
 */
function onError (error: { syscall: string; code: any; }) {

    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            i(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            i(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}



/**
 * Listen for HTTP server "listening" event
 */
function onListening () {

    const addr = serverRunningInstance.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr!.port;

    i('Listening on ' + bind);

}





/********************************************************************************************************/
/* Need functions
/********************************************************************************************************/

function renderStylusInCss () {
    
    let fileList: string[] =
        readFilenames({ url: join(__root, 'source', 'stylus'), extension: 'styl' });

    for (let filename in fileList) {

        // Stylus original folder
        const stylusPath: string = join(__root, 'source', 'stylus', fileList[filename] + '.styl');
        // CSS result folder
        const cssPath: string = join(__root, 'public', 'css', fileList[filename] + '.css');

        // Reads the Stylus file
        getFileContent({ url: stylusPath }).then(content => {

            // Converts the Stylus data to CSS data
            stylus.render(content, (_errorOnRenderCss: NodeJS.ErrnoException | null, cssData: string) =>
                setFileContent({ url: cssPath }, cssData).catch(error => i(error.stack)));

        }).catch(error => i(error.stack));

    }
}


export function getLanguage (language: string = 'en-US'): any {

    let fileList: string[] =
            readFilenames({ url: translationUrl, extension: 'json' });
    
    for (let filename in fileList) {
        if (fileList[filename] === language) {
            return JSON.parse(
                readFileSync(
                    join(__root, 'source', 'translations', language + '.json'),
                    'utf8'));
        }
    }
}




/********************************************************************************************************/
/* External Functions
/********************************************************************************************************/

/**
 * Add new header (Ease way)
 */
export function insertHeader (title: string, content: string, url?: string) {
    
    if (url === null || url === undefined || url === '') { url = '/*'; }
    if (!url.startsWith('/')) { url += '/' + url; }
    if (url.endsWith('/')) { url = url.substr(0, url.length - 2); }

    app.use(url, (_request, response, next) => {
        response.header(title, content);
        return next();

    });

}



export function insertUrlMiddleware (url: string, middleware: Function) {
    app.use(url, middleware());
}



export function insertGetRouter (url: string, middleware: express.Router) {
    app.get(url, middleware);
}



export function insertPostRouter (url: string, middleware: express.Router) {
    app.post(url, middleware);
}



export function insertRouter (middleware: express.Router) {
    app.use(middleware);
}



export function insertCookies (cokName: string, cokVaue: string, isSigned: boolean = true) {
    
    app.use((_request, response, next) => {
        response.cookie(cokName, cokVaue, { signed: isSigned, httpOnly: true, maxAge: Date.now() + (10 * 365 * 24 * 60 * 60) });
        return next();
    });
}



export function getCookie (cokName: string, isSigned: boolean = true) {
    
    let cookie: any = null;

    app.use((request, _response) => {

        if (isSigned) {
            cookie = request.signedCookies[cokName];
        } else {
            cookie = request.cookies[cokName];
        }
        
        return !isNullOrUndefined(cookie) ? cookie : false;
    });
}



app.post('/lang/:language', (request, response, _next) => {
    
    let language: string = request.params.language;
    
    if (!isNullOrUndefined(language)) {
        response.cookie('language', language, { signed: true, httpOnly: true, maxAge: Date.now() + (10 * 365 * 24 * 60 * 60) });
        response.json(getLanguage(language));
    } else {
        response.cookie('language', 'en-US', { signed: true, httpOnly: true, maxAge: Date.now() + (10 * 365 * 24 * 60 * 60) });
        response.json(getLanguage());
    }
});