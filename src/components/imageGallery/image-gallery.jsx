import PropTypes from "prop-types";
import { AutomotiveImages, TravelImages } from "./images";

const GalleryItem = ({ thumbSrc, alt, width, height }) => (
  <li
    style={{ "--r": width / height }}
    className="w-full sm:grow-(--r) sm:basis-[calc(var(--r)*360px)] aspect-(--r)"
  >
    <img
      src={thumbSrc}
      alt={alt}
      loading="lazy"
      className="w-full h-full block"
    />
  </li>
);

GalleryItem.propTypes = {
  thumbSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const PhotoGallery = ({ images }) => (
  <ul className="flex flex-wrap gap-1 p-0 m-0 list-none">
    {images.map((img, i) => (
      <GalleryItem key={i} {...img} />
    ))}
    <li style={{ flexGrow: 999, flexBasis: 0 }} />
  </ul>
);

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      thumbSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const ImageGallery = () => (
  <div className="flex flex-col max-w-full">
    <h2 className="text-[calc(1rem+0.5vw)] tracking-[0.4rem] font-light text-text-light mb-4">
      Automotive
    </h2>
    <PhotoGallery images={AutomotiveImages} />
    <h2 className="text-[calc(1rem+0.5vw)] tracking-[0.4rem] font-light text-text-light mt-8 mb-4">
      Travel
    </h2>
    <PhotoGallery images={TravelImages} />
  </div>
);

export default ImageGallery;
