import React from "react";
import AdminService from "../../Services/AdminService";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { id } = this.props;
    this.getImage(id);
  }

  getImage = (imageId) => {
    AdminService.getImages(imageId).then((response) => {
      if (response) {
        this.setState({ image: response });
      }
    });
  };

  render() {
    let { image } = this.state;
    return (
      <div>
        <img id="imagePreview" src={image}></img>
      </div>
    );
  }
}

export default ImageView;
