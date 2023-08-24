const validEmail = (email) => {
  if (email) {
    let value = email.toString().trim();
    var valid = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    return valid;
  } else {
    return false;
  }
};

const validDate = (date) => {
  if (date) {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      if (isNaN(date.getTime())) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
};

const isEmptyOrNull = (value) => {
  if (value == "" || value == null || value == undefined) {
    return true;
  }
  return false;
};

const removeSpecialCharacters = (string) => {
  let remainder = string.replace(/[^0-9]/g, "");
  return remainder;
};


module.exports = {
  validEmail,
  validDate,
  isEmptyOrNull,
  removeSpecialCharacters
};
