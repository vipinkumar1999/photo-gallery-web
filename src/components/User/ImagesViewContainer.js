import React from "react";
import AdminService from "../../Services/AdminService";
import StorageService from "../../Services/StorageService";
import history from "../../utils/History";
import { withRouter } from "react-router-dom";

class ImagesViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let user = StorageService.getUser();

    AdminService.getImageIds(user._id).then((response) => {
      if (response.success) {
        if (response.imageIds.length >= 1) {
          this.getImages(response.imageIds);
        }
      }
    });
  }

  getImages = (imageIds) => {
    let imageUrls = [];
    let promises = imageIds.map((id) => {
      return AdminService.getImages(id).then((response) => {
        if (response.success) {
          return response.url;
        }
      });
    });
    Promise.all(promises).then((imageUrls) => {
      this.setState({ imageUrls, imageIds });
    });
  };

  doLogOut = () => {
    StorageService.removeUser();
    this.props.history.push("./signin");
  };

  render() {
    let { imageIds = [], imageUrls = [] } = this.state;

    return (
      <div>
        <div
          style={{ justifyContent: "space-around" }}
          className="d-flex align-items-center"
        >
          <div>
            <h4>Images View</h4>
          </div>
          <div style={{ cursor: "pointer" }} onClick={this.doLogOut}>
            Logout
          </div>
        </div>
        {imageUrls.length >= 1 && imageIds.length >= 1 ? (
          <React.Fragment>
            {imageUrls.map((url) => (
              <img
                id="imagePreview"
                style={{ height: 100, width: 100 }}
                src={url}
              ></img>
            ))}
          </React.Fragment>
        ) : (
          <div
            style={{ height: "100vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div
              style={{
                border: "1px solid black",
                padding: 10,
                width: "max-content",
              }}
            >
              No Images available
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ImagesViewContainer;
