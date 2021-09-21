import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Switch>
        <Route
          path="/"
          component={() => <Redirect to="/My Documents" />}
          exact
        />
        <Route component={AppContent} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
