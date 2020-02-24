export function printWarning(message: string) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof console !== 'undefined') {
      console.error(`Warning: ${message}`); // eslint-disable-line
    }

    throw new Error(`Warning: ${message}`);
  }
}
