const replacer = (key: any, value: any) =>
  value instanceof Date ? value.toISOString() : value;

const reviver = (key: any, value: any) =>
  typeof value === "string" &&
  value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ? new Date(value)
    : value;

export const encodeDates = (toDehydrate: Record<any, any>) =>
  JSON.stringify(toDehydrate, replacer);

export const decodeDates = (toRehydrate: string) =>
  JSON.parse(toRehydrate, reviver);
