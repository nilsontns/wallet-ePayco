/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { connectDB } from '@libs/db';
import { RoutingService } from './routes';
import { errorHandler } from './utils/errors';

const routingService: RoutingService = new RoutingService();

async function bootstrap() {
  await connectDB();
  console.log('🚀 Wallet-Core iniciado');
}
bootstrap();

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

routingService.mountApiRoutes(app, '/v1');
app.use(errorHandler);
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
