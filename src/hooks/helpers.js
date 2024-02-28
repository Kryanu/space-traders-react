export const isValidArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const display = (obj) => {
  if (obj) {
    console.log(obj);
  }
};
