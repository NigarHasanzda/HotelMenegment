import React, { useEffect, useRef, useState } from 'react';

const FadeInFromBottom = ({ children, duration = '0.8s', delay = '0s' }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: duration,
    transitionTimingFunction: 'ease-out',
    transitionDelay: delay,   // burada delay istifadə olunur
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default FadeInFromBottom;
