export const generateReferenceId = (prefix = 'NS') => {
  const timestamp = Date.now().toString().slice(-6);
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${randomChars}`;
};

export const escapeCSV = (str) => {
  if (str === null || str === undefined) return '""';
  const stringValue = String(str).replace(/"/g, '""');
  return `"${stringValue}"`;
};

export const jsonToCSV = (items, headers) => {
  if (!items || !items.length) {
    return headers.map(h => escapeCSV(h.label)).join(',') + '\n';
  }

  const headerRow = headers.map(h => escapeCSV(h.label)).join(',');
  const dataRows = items.map(item => {
    return headers.map(h => {
      const val = typeof h.key === 'function' ? h.key(item) : item[h.key];
      return escapeCSV(val);
    }).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
};
