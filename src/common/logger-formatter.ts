import { LogFormatter } from "@aws-lambda-powertools/logger";
import { UnformattedAttributes, LogAttributes } from "@aws-lambda-powertools/logger/lib/types";

export class LoggerFormatter extends LogFormatter {
    formatAttributes(attributes: UnformattedAttributes): LogAttributes {
        return {
            msg: attributes.message,
            srvc: attributes.serviceName,
            env: attributes.environment,
            awsRequestId: attributes.lambdaContext?.awsRequestId,
            function: {
                name: attributes.lambdaContext?.functionName,
                coldStart: attributes.lambdaContext?.coldStart,
            },
            logLevel: attributes.logLevel,
            ts: this.formatTimestamp(attributes.timestamp),
        };
    }
}
