import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import * as https from 'https';
import * as fs from 'fs';
import * as os from 'os';
const rateLimit = require("express-rate-limit");

import 'localstorage-polyfill'

global['localStorage'] = localStorage;

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  let distFolder = '/app/blog-backend/dist/blog-frontend/browser';
  if (process.env.NODE_ENV !== 'production' || os.hostname() === 'LAPTOP-C2N7G7I4') { // Check if running from my local machine or non-production
    console.log('Using non-production environment.');
    distFolder = "C:\\Users\\hqjb\\OneDrive\\Desktop\\Programming\\Personal Blog\\blog-frontend\\dist\\blog-frontend\\browser";
  }
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  server.use(limiter);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const HTTP_PORT = process.env.HTTP_PORT || 80;
  const HTTPS_PORT = process.env.HTTPS_PORT || 443;

  // // Start up the Node server
  const server = app();
  server.listen(HTTP_PORT, () => {
    console.log(`Node Express server listening on http://localhost:${HTTP_PORT}`);
  });

try {
    if (fs.existsSync('/etc/letsencrypt/live/hequanjie.com/privkey.pem')) {
        https.createServer(
            {
                key: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/privkey.pem'),
                cert: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/cert.pem'),
                ca: fs.readFileSync('/etc/letsencrypt/live/hequanjie.com/chain.pem'),
            },
            server
        ).listen(HTTPS_PORT, () => {
            console.info(`Application started on port ${HTTPS_PORT} at ${new Date()}`);
        });
    }
} catch(e) {
    console.error(e);
};

}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
