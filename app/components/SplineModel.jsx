import React, { useEffect, useRef } from 'react';
import { Spline } from '@splinetool/runtime';

function SplineModel() {
  const splineRef = useRef(null);

  useEffect(() => {
    const spline = new Spline({
      canvas: splineRef.current,
      url: 'URL_TO_YOUR_SPLINE_MODEL',
    });

    return () => spline.dispose();  // Cleanup on component unmount
  }, []);

  return <canvas ref={splineRef} style={{ width: '100%', height: '100vh' }}></canvas>;
}

export default SplineModel;
