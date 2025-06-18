import morgan from "morgan";
import Logger from "./logger.middleware";

const morganMiddleware = morgan(
    'dev',
    {
      stream: {
        write: (message) => Logger.http(message.trim()),
      },
    }
  );

export default morganMiddleware