import express from 'express';
import logger from 'morgan';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.listen(4000, () => console.log('Server started on port %d', 4000));
