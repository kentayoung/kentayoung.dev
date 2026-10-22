import { useLocation, Routes, Route } from "react-router-dom";

import Home from "./home";
import Photography from "./photography";
import Needed from "./work/needed";
// const Photography = lazy(() => import('./routes/photography'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/work/needed" element={<Needed />} />
      <Route exact path="/photography" element={<Photography />} />
    </Routes>
  );
};

export default AnimatedRoutes;
