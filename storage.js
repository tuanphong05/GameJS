/* ---------------------------------------------------
    FUNCTIONS
----------------------------------------------------- */
/**
 * Save to local storage with key - value pair, convert value to string
 * @param {key} key
 * @param {value} value
 */
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get data from storage, convert string to value, if no data return empty array
 * @param {key} key
 * @param {defaultVal} defaultVal
 * @returns
 */
function getFromStorage(key, defaultVal) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultVal;
}
