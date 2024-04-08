import cluster from "cluster";
import os from "os";
import { startServer } from "./app.js";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  startServer();
}
