export const setItemsInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('Cannot store in LS');
    return;
  }

  try {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
    console.log(`Stored ${key} in LS`);
  } catch (error) {
    console.error('Error storing in LS', error);
  }
};


export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot get value from LS`);
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot remove item from LS`);
  }
  localStorage.removeItem(key);
};
