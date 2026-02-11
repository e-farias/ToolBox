import { serverPeer } from "./config"
import DimseJobs from "./services/jobs/dimse"
import DimseServer from './server'
import dotenv from 'dotenv'
dotenv.config()

// Server
DimseServer.listen(serverPeer.port)

// Jobs
DimseJobs.createExams(
  "*/5 * * * *", // crontab.guru/every-5-minutes
  50
)

DimseJobs.sentExams(
  "0 */4 * * *", // https://crontab.guru/every-4-hours
  50
)
