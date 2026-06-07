import { useEffect, useRef, useState } from "react";

const ProgressBar = ({ percent, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-2.5">
      <div className="text-text-light mb-1.25">{title}</div>
      <div className="border border-[#3a3f2e] h-3 overflow-hidden">
        <div
          style={{ width: percent ? `${percent}%` : undefined }}
          className={isVisible ? "pb-bar-progress pb-animate bg-seafoam h-full" : ""}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
