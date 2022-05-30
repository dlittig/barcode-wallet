export const humanReadableDate = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getDate())}.${padd(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
};

export const humanReadableTime = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())}`;
};

export const backupTimestamp = (time: number): string => {
  const date: Date = new Date(time);
  return `${date.getFullYear()}-${padd(date.getMonth() + 1)}-${padd(
    date.getDate()
  )}_${padd(date.getHours())}-${padd(date.getMinutes())}`;
};

export const humanReadableMoney = (value: number, unit: string): string => {
  // Convert value to string and figure out present decimal places
  const valueString = `${value}`;
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    // Has decimal
    const padCount = valueString.length - 1 - decimalIndex;

    if (padCount === 1) {
      return `${unit} ${valueString}0`;
    } else {
      return `${unit} ${valueString}`;
    }
  } else {
    // Has no decimal
    return `${unit} ${valueString}.00`;
  }
};

export const padd = (elem: number): string => {
  if (elem >= 0 && elem < 10) {
    return `0${elem}`;
  } else if (elem > -10 && elem < 0) {
    return `-${padd(elem * -1)}`;
  }

  return `${elem}`;
};

export const getHoursFromTimestamp = (date: Date) => date.getHours();

export const getMinutesFromTimestamp = (date: Date) => date.getMinutes();

export const getLocalDateTime = (
  year: string,
  month: string,
  day: string,
  hours: string,
  minutes: string
): Date => {
  const tz = new Date().getTimezoneOffset() / -60;
  const delta = tz >= 0 ? "+" : "-";
  const datetime = new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:00${delta}${padd(tz)}:00`
  );

  return datetime;
};

export const capitalize = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};
