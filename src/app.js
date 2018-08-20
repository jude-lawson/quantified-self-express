import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import { environment } from './config';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.set('port', process.env.PORT || 8000);
app.locals.title = 'Quantified Self Express API';


/* Start server */

app.listen(app.get('port'), () => {
  console.log('Starting server...')
  console.log(`${app.locals.title} is now running on port ${app.get('port')} in the ${environment} environment.`);
});

module.exports = app;

