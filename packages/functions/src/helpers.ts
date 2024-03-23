export default function handler<T extends Array<any>>(
  lambda: (...args: T) => Promise<Record<string, any>>
) {
  return async (...args: T) => {
    let body, statusCode;

    try {
      let res = await lambda(...args);
      body = JSON.stringify(res);
      statusCode = 200;
    } catch (error) {
      console.error(error);
      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
      statusCode = 500;
    }

    return {
      body,
      statusCode,
    };
  };
}
