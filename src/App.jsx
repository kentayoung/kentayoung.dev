import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/navbar/navbar";
import AnimatedRoutes from "./routes/animatedRoutes";

function App() {
  const updateViewportHeight = () => {
    document.documentElement.style.setProperty(
      "--viewport-height",
      `${window.innerHeight}px`,
    );
  };
  window.addEventListener("resize", updateViewportHeight);
  updateViewportHeight();
  console.group(`%c👋 Fancy seeing you here. Don't forget to check out my other links.`, "font-size: 14px;");
  console.log(`%c👨‍💻 Github - https://github.com/kentayoung`, "font-size: 12px;");
  console.log(`%c📄 LinkedIn - https://www.linkedin.com/in/kentayoung`, "font-size: 12px;");
  console.log(`%c📧 Email - Kenta@KentaYoung.dev`, "font-size: 12px;");
  console.groupEnd();

  return (
    <div>
      <HelmetProvider>
        <Router>
          <Navbar Router={Router} />
          <AnimatedRoutes />
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
