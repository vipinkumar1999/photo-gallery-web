import React from "react";
import Select from "react-select";
import AdminService from "../../Services/AdminService";
import StorageService from "../../Services/StorageService";

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { access: "public" };
  }

  componentDidMount() {
    let isLoggedin = StorageService.isLoggedIn();
    let type;
    if (isLoggedin) {
      let user = StorageService.getUser();
      type = user.type;
    }
    this.setState({ isLoggedin, type: type || null });
  }

  getUsers = () => {
    let accessOptions = [];
    AdminService.getUsers().then((response) => {
      if (response.success) {
        if (response.data.length >= 1) {
          response.data.map((user) => {
            accessOptions.push({ label: user.NAME, value: user.ID });
          });
        }
      }
    });
    this.setState({ accessOptions });
  };
  onChangeImage = (e) => {
    let imagePreview = e.target.files[0];
    this.setState({ imagePreview: URL.createObjectURL(imagePreview) });
    const imageData = new FormData();
    imageData.append("image", imagePreview);
    this.setState({ imageData });
  };

  onChangeCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  onChangeAcess = (option) => {
    this.setState({ access: option.value }, () => {
      if (option.value === "private") {
        this.getUsers();
      }
    });
  };

  onChangeAcessPerson = (options) => {
    this.setState({ accessPersons: options.map((option) => option.value) });
  };

  uploadImage = () => {
    let { imageData, access, accessPersons, category } = this.state;
    let errorMsg;
    let imageId = Date.now();
    let newAccessPersons = "";
    if (accessPersons) {
      accessPersons.map((p, index) => {
        if (index != 0 && index != accessPersons.length) {
          newAccessPersons += "-" + p;
        } else {
          newAccessPersons += p;
        }
      });
    }
    if (imageData && access && category) {
      AdminService.uploadImage(
        imageData,
        access,
        category,
        imageId,
        newAccessPersons
      ).then((response) => {
        if (response.success) {
          this.setState({ imageUploaded: true });
        }
      });
    } else {
      errorMsg = "Please add fileds";
      this.setState({ errorMsg });
    }
  };

  render() {
    let { access, errorMsg, imageUploaded, isLoggedin, type, accessOptions } =
      this.state;
    if (isLoggedin && type === "admin") {
      return (
        <div
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div style={{ border: "1px solid black", padding: 10 }}>
            {errorMsg && (
              <div style={{ border: "1px solid red", padding: 10 }}>
                {errorMsg}
              </div>
            )}
            {imageUploaded && (
              <div style={{ border: "1px solid green", padding: 10 }}>
                Image uploaded successfully!
              </div>
            )}
            <div className="mb-1">
              <h5>Upload Image</h5>
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={this.onChangeImage}
              />
            </div>
            <div className="mb-1">
              <h5>Image category</h5>
              <input type="text" onChange={this.onChangeCategory} />
            </div>
            <div className="mb-1">
              <h5>Access type</h5>
              <Select
                className="col-md-4"
                options={[
                  { label: "Public", value: "public" },
                  { label: "Private", value: "private" },
                ]}
                onChange={this.onChangeAcess}
              />
            </div>
            {access === "private" && (
              <div className="mb-1">
                <h5>Give access to</h5>
                <Select
                  className="col-md-5"
                  options={accessOptions}
                  isMulti={true}
                  onChange={this.onChangeAcessPerson}
                />
              </div>
            )}
            <div className="mb-1">
              <button
                className="btn btn-md btn-primary"
                onClick={this.uploadImage}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>You do not have access to this page</div>;
    }
  }
}

export default UploadImage;
