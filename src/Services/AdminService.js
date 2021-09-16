import http from "./Ajax";
import StorageService from "./StorageService";

function createLoggedInUserState(user, token) {
  return {
    _id: user.ID,
    email: user.EMAIL,
    type: user.TYPE,
  };
}

class AdminService {
  static registerUser(email, name, password, type) {
    return http
      .post("/api/register", { email, name, password, type })
      .then((response) => {
        if (response.success) {
          let lUser = createLoggedInUserState(response.user);
          StorageService.storeLoginUser(lUser);
          return response;
        } else if (!response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }

  static signIn(email, password) {
    return http.post("/api/sign-in", { email, password }).then((response) => {
      if (response.success) {
        let lUser = createLoggedInUserState(response.user);
        StorageService.storeLoginUser(lUser);
        return response;
      } else if (response.message) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static getUsers() {
    return http.get("/api/get-users").then((response) => {
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static uploadImage(imageData, access, category, imageId, accessPersons) {
    return http
      .uploadFile(
        "/api/admin/image/" +
          imageId +
          "?access=" +
          access +
          "&category=" +
          category +
          "&accessPersons=" +
          accessPersons,
        imageData
      )
      .then((response) => {
        if (response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }

  static getImageIds(userId) {
    return http.get("/api/user/" + userId + "/getImageIds").then((response) => {
      if (response) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static getImages(imageId) {
    return http
      .getFile("/api/user/" + imageId + "/getImage")
      .then((response) => {
        if (response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }
}

export default AdminService;
