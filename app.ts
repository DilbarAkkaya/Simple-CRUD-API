//import { users } from './src/users';
//import { createUser } from './src/api/functions';
import { createServer } from './src/api/server';
import cluster from 'cluster';
import os from 'os';
import http from 'http';
const countCPUs = os.cpus().length;
const port = process.env.PORT || 4000;
const workers = cluster.workers;

if (cluster.isPrimary) {
  for (let i = 1; i <= (countCPUs - 1); i++) {
    cluster.fork({ worker_port: Number(port) + 1 });
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(worker)
    cluster.fork({ worker_port: Number(port) });
  });
  const load_balancer = http.createServer((req, res) => {
    let availableWorker;
    if (workers) {
      const workerValues = Object.values(workers);
      for (let i = 0; i < workerValues.length; i++) {
        const worker = workerValues[i];
        if (worker) {
          availableWorker = worker;
          break;
        }
      }
      if (availableWorker && req.url) {
        availableWorker.send(req.url);
        availableWorker.on('message', (data) => {
          res.writeHead(data.statusCode, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data.body));
        });
      }
    }
    
  });
  load_balancer.listen(port, () => {
    console.log(`Load_balancer is running on port ${port}`);
  });
} else {
  const server = createServer();
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}