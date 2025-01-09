import { cronJobs } from "convex/server";
import { internal } from "@/convex/_generated/api";
import { CRON_INTERVAL } from "@/convex/constants";

const crons = cronJobs();

crons.interval(
  "run games for all active models",
  { minutes: CRON_INTERVAL },
  internal.models.runActiveModelsGames,
);

export default crons;
