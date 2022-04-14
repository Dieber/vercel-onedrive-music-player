import { o, toUpper } from "ramda";

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const camelToConstantCase = o(toUpper, camelToSnakeCase);
