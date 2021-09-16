var L_USER = "L_USER";

function storeLoginUser(user) {
  localStorage.setItem(L_USER, JSON.stringify(user));
}

function getToken() {
  var stored = JSON.parse(localStorage.getItem(L_USER));
  return stored ? stored._id : null;
}

function getUserId() {
  var stored = JSON.parse(localStorage.getItem(L_USER));
  return stored ? stored._id : null;
}

function getUser() {
  var user = JSON.parse(localStorage.getItem(L_USER));
  return user ? user : null;
}

function isLoggedIn() {
  var stored = JSON.parse(localStorage.getItem(L_USER));
  return stored ? true : false;
}

function removeUser() {
  localStorage.removeItem("L_USER");
  return true;
}

export default {
  getToken: getToken,
  storeLoginUser: storeLoginUser,
  isLoggedIn: isLoggedIn,
  getUser: getUser,
  removeUser: removeUser,
  getUserId: getUserId,
};
