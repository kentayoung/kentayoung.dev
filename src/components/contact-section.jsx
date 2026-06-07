import React from "react";
import { IconContext } from "react-icons";
import { MdLocationPin, MdEmail } from "react-icons/md";

const ContactSection = React.forwardRef((props, ref) => {
  return (
    <section
      id="contact"
      className="flex justify-center flex-wrap pt-5 pb-2.5 w-[calc(100vw-110px)] max-w-245 mx-auto max-[900px]:w-[calc(100vw-40px)] max-[900px]:flex-col max-[900px]:items-center"
      ref={ref}
    >
      <IconContext.Provider value={{ color: "#8a9e72" }}>
        <div className="gap-6 flex md:flex-row flex-col items-center">
          <div className="bg-[#262b20] rounded-[10px] w-[28vw] min-w-50 text-center p-10 max-w-75 max-[900px]:w-[90vw] max-[900px]:max-w-125">
            <MdLocationPin className="h-5 w-5 mx-auto" />
            <h4 className="font-normal uppercase text-[0.8rem] tracking-[0.15rem] text-text-light mt-1">
              Location
            </h4>
            <hr className="border-seafoam border-2 w-12 mx-auto my-6" />
            <div className="text-[80%] text-text-light">SW Idaho</div>
          </div>
          <div className="bg-[#262b20] rounded-[10px] w-[28vw] min-w-50 text-center p-10 max-w-75 max-[900px]:w-[90vw] max-[900px]:max-w-125">
            <MdEmail className="h-5 w-5 mx-auto" />
            <h4 className="font-normal uppercase text-[0.8rem] tracking-[0.15rem] text-text-light mt-1">
              Email
            </h4>
            <hr className="border-seafoam border-2 w-12 mx-auto my-6" />
            <div className="text-[80%] text-text-light">
              <a
                href="mailto:kenta@kentayoung.dev"
                className="link-hover text-text-light"
              >
                Kenta@KentaYoung.dev
              </a>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
