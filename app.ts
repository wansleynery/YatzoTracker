
import * as Server from "./source/assets/server/server"; // Server Source

// Routers
const homeRouter = require(Server.routesPath + 'home').homeRouter;
const statsRouter = require(Server.routesPath + 'stats').statsRouter;
const notFoundRouter = require(Server.routesPath + 'notFound').notFoundRouter;

// Server settings
Server.set();

// Server.insertHeader('headerName', 'headerValue');
// Server.insertCookies('CookieName', 'CookieValue', true);
// Server.setLanguage('pt-BR'); // Sets the system language [used to common log messages]

// Server routes
Server.insertGetRouter('/', homeRouter);
Server.insertGetRouter('/stats/:epidemy/:region/:period', statsRouter);
Server.insertRouter(notFoundRouter); // Not found or error page router

// Server Initialization
Server.start();