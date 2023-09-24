import React, { useState, useRef, useEffect } from 'react';
import p5 from "p5";
import '../../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {moveAC} from '../../redux/actions/actions'
import {Quid} from '../../models/Quid'


const P5Stage = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const state:any = useSelector(state => state);
  let selectedCircle: Quid | null = null;
  const STAGE_WIDTH = 600;
  const STAGE_HEIGHT = 900;
  let p5Ref = useRef<p5 | null>(null); 
  let videoRef = useRef<any>(null);
  

  const changeVideoSource = async (src: string) => {
    console.log(p5Ref.current, videoRef.current, src)
    if (p5Ref.current) {
        videoRef.current = p5Ref.current.createVideo(src);
        videoRef.current.play();
        videoRef.current.loop();
    
      
      } 
  }
  
  const handleUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "video/mp4") {
      const url = URL.createObjectURL(file);
      changeVideoSource(url);
  }
  }

  useEffect(() => {
    let p5Instance: p5 | null;

    
    if (canvasRef.current) {
      const sketch = (p: p5) => {
        p5Ref.current = p;
        let video;
        videoRef.current = video;

        // Setup the sketch
        p.setup = () => {
          p.createCanvas(STAGE_WIDTH, STAGE_HEIGHT).parent(canvasRef.current!);
          videoRef.current = p.createVideo("/assets/v2.mp4");
          videoRef.current.play();
          videoRef.current.loop();
          videoRef.current.hide();
          
        };
        



        // Some interaction methods
        p.mousePressed = () => {
          // Check each circle to see if it's under the mouse pointer
          const allFixtures = state?.stage?.fixtures?.byId;
          for (let each in allFixtures) {
              const x = allFixtures[each].tx;
              const y = STAGE_HEIGHT / 3 - allFixtures[each].ty; 
              const distance = p.dist(x, y, p.mouseX, p.mouseY);
              
              if (distance < 25) {  // 25 being the radius of your circle
                  selectedCircle = allFixtures[each];
                  break;
              }
          }
        };
      
      p.mouseDragged = () => {
          if (selectedCircle) {
              selectedCircle.tx = Math.round(p.mouseX * 100) / 100
              selectedCircle.ty = Math.round((STAGE_HEIGHT / 3 - p.mouseY )* 100)/100  // Adjust based on your layout
          }
      };
      
      p.mouseReleased = () => {
          if (selectedCircle) {
              // If you are using Redux, dispatch an action to update the circle position in your state
              dispatch(moveAC(selectedCircle));
              selectedCircle = null;
          }
      }



        // Drawing the sketch
        p.draw = () => {
          p.background(0); // Setting the background to black
          const allFixtures = state?.stage?.fixtures?.byId;
          for (let each in allFixtures) {
              const x = allFixtures[each].tx;
              const y = STAGE_HEIGHT / 3 - allFixtures[each].ty; // Updated for 1/3 of the canvas height
              
              videoRef.current.loadPixels();
              let getPixels = videoRef.current.get(x, y);
              let R = getPixels[0];
              let G = getPixels[1];
              let B = getPixels[2];
              let A = 255;
      
              p.push();
              p.fill(R, G, B, A);
              p.circle(x, y, 25); 
              p.pop();
          }
      
          // Middle Rectangle: The video
          p.image(videoRef.current, 0, STAGE_HEIGHT / 3, STAGE_WIDTH, STAGE_HEIGHT / 3); // Starting the video 1/3 down the canvas
      
          // Bottom Rectangle: An empty space for later data. 
          // If you want a specific background color or some kind of marker to differentiate it, you can add it here.
          // For example, you might fill it with a gray color:
          p.fill(200);
          p.rect(0, (STAGE_HEIGHT / 3) * 2, STAGE_WIDTH, STAGE_HEIGHT / 3); // Starting the rectangle 2/3 down the canvas
      };
      };
      
      p5Instance = new p5(sketch);
    }
    
    return () => {
      if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
        p5Ref.current = null;
        videoRef.current = null;
      }
    };
  }, [state]);

  const handleClick = () => {
    console.log("state", state);
  };

  return (
    <>
      
      <button onClick={() => changeVideoSource("/assets/v2.mp4")}>Video 1</button>
      <button onClick={() => changeVideoSource("/assets/v4.mp4")}>Video 2</button> 
      {/* <label className="uploadButton">
          Upload Video
          <input 
              type="file" 
              onChange={handleUpload} 
              accept="video/mp4"
              style={{ display: 'none' }}  // This hides the default file input
          />
      </label> */}
      <div ref={canvasRef}></div>
      <button onClick={handleClick}> BUTTON</button>
    </>
  );
}

export default P5Stage;
