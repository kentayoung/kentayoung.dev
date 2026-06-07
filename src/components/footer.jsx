import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex justify-center py-6">
      <a id="linkedIn-KentaYoung" href="https://www.linkedin.com/in/kentayoung" target="_blank" rel="noreferrer" className="icon-circle">
        <FaLinkedin />
      </a>
      <a id="instagram-KentaYoung" href="https://instagram.com/kenta_young" target="_blank" rel="noreferrer" className="icon-circle">
        <FaInstagram />
      </a>
      <a id="facebook-KentaYoung" href="https://www.facebook.com/kentayoungphotography" target="_blank" rel="noreferrer" className="icon-circle">
        <FaFacebook />
      </a>
      <a id="github-KentaYoung" href="https://github.com/kentayoung" target="_blank" rel="noreferrer" className="icon-circle">
        <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
