import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'
// import footerImage from '../../assets/coolDots.jpg';
const Footer = () => {
  // add pertinent state here
  const [showVideo, setShowVideo] = useState(false);

 
  return(
    <div className="footer">
      {/* {showVideo ? (
        <video width="320" height="240" autoPlay loop>
          <source src="/assets/v2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          
        </video>

      ) : null}
      {showVideo ? (
        <video width="320" height="240" controls>
          <source src="/assets/sample-5s.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          
        </video>

      ) : null}
      {!showVideo ? <button onClick={() => setShowVideo(true)}>Load Video</button> : null} */}
    </div>
  );
}

export default Footer;
