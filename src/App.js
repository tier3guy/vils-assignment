// External Imports
import { Routes, Route } from "react-router-dom";

// Internal Imports - files
import routes from "./routes";

const App = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          exact={route.exact}
          path={route.path}
          element={route.page}
          key={index}
        />
      ))}
    </Routes>
  );
};

export default App;
