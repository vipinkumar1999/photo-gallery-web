import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import UploadImage from "./components/Admin/uploadImage";
import ImagesViewContainer from "./components/User/ImagesViewContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/user/images" exact component={ImagesViewContainer}/>
          <Route path="/admin/uploadImage" exact component={UploadImage} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/register" exact component={Signup} />
          {/* <Route path="/user/:userId" exact component={UserViewContainer} /> */}
          <Route path="/" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
