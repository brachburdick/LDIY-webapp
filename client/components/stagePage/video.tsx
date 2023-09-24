import React, { useRef, useEffect } from 'react';
import p5 from "p5";

function VideoCanvas() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const p = new p5(sketch, canvasRef.current);
    return () => p.remove();
  }, []);

  const sketch = (p) => {
    let video;
    
    p.setup = () => {
      p.createCanvas(640, 480); // assuming this is the size of your video
      video = p.createVideo("/path/to/your/video.mp4");
    //   video.hide();
    };

    p.draw = () => {
      p.image(video, 0, 0);  // drawing the video frame to the p5 canvas

      const x = 320;  // sample x, y coordinates
      const y = 240;
      const col = video.get(x, y);
      // now, 'col' contains the color of the pixel at (x, y)
      // use 'col' to color your fixture representation or any other operation
    };
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} src="/path/to/your/video.mp4"></video>
    </div>
  );
}

export default VideoCanvas;
