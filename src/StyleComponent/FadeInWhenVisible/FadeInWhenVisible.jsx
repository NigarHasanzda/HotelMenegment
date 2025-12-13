import React, { useEffect, useRef, useState } from 'react';

const FadeInFromRight = ({ children, className = '', style = {}, ...props }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animasiya bir dəfə olsun
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'fade-in-right-visible' : 'fade-in-right-hidden'}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeInFromRight;
