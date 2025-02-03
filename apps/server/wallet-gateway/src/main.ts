import express from 'express';
import * as path from 'path';

import { RoutingService } from './routes';

const cors = require("cors");

const routingService: RoutingService = new RoutingService();
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

routingService.mountApiRoutes(app, '/api');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
