import { useLocation } from "react-router-dom";
import About from "../../../pages/external/Sections/About";
import Career from "../../../pages/external/Sections/Career";
import Contact from "../../../pages/external/Sections/Contact";
import Home from "../../../pages/external/Sections/Home";
import Projects from "../../../pages/external/Sections/Projects";
import Services from "../../../pages/external/Sections/Services";
import Navbar from "./Navbar";
import "./externallayout.css";

export const sectionDetails = [
  { name: "home", url: `#home`, icon: "", content: <Home /> },
  { name: "services", url: `#services`, icon: "", content: <Services /> },
  { name: "projects", url: `#projects`, icon: "", content: <Projects /> },
  { name: "about", url: `#about`, icon: "", content: <About /> },
  { name: "career", url: `#career`, icon: "", content: <Career /> },
  { name: "contact", url: `#contact`, icon: "", content: <Contact /> },
];
function ExternalLayout() {
  return (
    <>
      <Navbar links={sectionDetails || null} />
      {sectionDetails?.map((link) => (
        <section
          key={link.url}
          id={`${link.name}`}
          className="d-flex justify-content-center align-items-center border-bottom bg-body"
          style={{ minHeight: "100dvh" }}>
          {link?.content}
        </section>
      ))}
      <footer className="col-12 py-5 text-center bg-gradient bg-body-tertiary">
        <div className="container col-12">
          <div className="row m-0 p-0 col-12">
            <div className="col-12">Footer Title</div>
            <hr />
            <div className="col-sm-12 col-md">1</div>
            <div className="col-sm-12 col-md">2</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ExternalLayout;
