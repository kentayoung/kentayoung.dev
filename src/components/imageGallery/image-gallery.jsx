import React from "react";
import { AutomotiveImages, TravelImages } from "./images";

const ImgNextGen = ({ srcWebp, fallback, alt, ...props }) => (
  <picture>
    <source srcSet={srcWebp} type="image/webp" />
    <source srcSet={fallback} type="image/jpeg" />
    <img src={fallback} alt={alt} {...props} />
  </picture>
);

const ImageGallery = () => {
  const mapImgs = (colNum, photos) => {
    let iterator = 0;
    return photos.reduce((acc, img, i) => {
      if (i === colNum || iterator === colNum) {
        acc.push(
          <ImgNextGen
            srcWebp={img.thumbWebp}
            fallback={img.thumbSrc}
            alt={img.alt}
            className="w-full py-2.5"
            key={i}
            loading="lazy"
          />
        );
      }
      iterator = iterator === 2 ? 0 : iterator + 1;
      return acc;
    }, []);
  };

  const Gallery = ({ photos, title }) => (
    <>
      <h2 className="text-[calc(1rem+0.5vw)] tracking-[0.4rem] font-light text-text-light mb-4">
        {title}
      </h2>
      <div className="flex flex-row justify-between w-full pb-12.5 max-[900px]:flex-col">
        <div className="flex flex-col max-w-[calc(33%-10px)] max-[900px]:max-w-screen">
          {mapImgs(0, photos)}
        </div>
        <div className="flex flex-col max-w-[calc(33%-10px)] max-[900px]:max-w-screen">
          {mapImgs(1, photos)}
        </div>
        <div className="flex flex-col max-w-[calc(33%-10px)] max-[900px]:max-w-screen">
          {mapImgs(2, photos)}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <Gallery photos={AutomotiveImages} title="Automotive" />
      <Gallery photos={TravelImages} title="Travel" />
    </div>
  );
};

export default ImageGallery;
