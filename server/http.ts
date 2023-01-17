import * as express from 'express';
import * as http from 'http';
import router from './router/http-router';
import errorHandler from './error-handler/error-handler';

const app = express();
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const server = http.createServer(app);

export default server;