import { Logger } from "@aws-lambda-powertools/logger";
import { LoggerFormatter } from "../common/logger-formatter";

const defaultValues = {
    region: process.env.AWS_REGION || "us-east-1",
    executionEnv: process.env.AWS_EXECUTION_ENV || "dev",
};

const logger = new Logger({
    serviceName: "InsightsEngine",
    logFormatter: new LoggerFormatter(),
    logLevel: "INFO",
    persistentLogAttributes: {
        ...defaultValues,
    },
});

export { logger };
