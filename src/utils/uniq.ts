function uniq(prefix?: string) {
  return [prefix, Math.random().toFixed(9)].filter(Boolean).join("-");
}

export { uniq };
