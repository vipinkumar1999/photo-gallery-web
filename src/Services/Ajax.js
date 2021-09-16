import storage from "./StorageService";
var serverURL = "http://localhost:8080";

function getHeaders(upload) {
  if (upload) {
    return {
      "x-api-key": storage.getToken(),
    };
  }

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": storage.getToken() || null,
  };
}

export default {
  get: function (url) {
    url = serverURL + url;
    return fetch(url, { method: "GET", headers: getHeaders() })
      .then(processResponse)
      .catch(processError);
  },
  post: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },
  delete: function (url) {
    url = serverURL + url;
    return fetch(url, { method: "DELETE", headers: getHeaders() })
      .then(processResponse)
      .catch(processError);
  },
  put: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },

  patch: function (url, data) {
    url = serverURL + url;
    return fetch(url, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(processResponse)
      .catch(processError);
  },

  uploadFile: function (url, file) {
    url = serverURL + url;
    return fetch(url, {
      method: "POST",
      headers: getHeaders(true),
      body: file,
    }).then((response) => response.json());
  },

  getFile: function (url) {
    url = serverURL + url;
    return fetch(url, { method: "GET", headers: getHeaders() })
      .then(processResponse)
      .catch(processError);
  },
};

function processResponse(response) {
  return response.json();
}

function processError(err) {
  showGlobalError();
}

function showGlobalError() {
  console.log("error");
}
