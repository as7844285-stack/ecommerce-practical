import { memo } from 'react';

const Footer = () => {
  return (
    <footer className="bottom">

  <div className="footer-container">

    <h2>e-product</h2>

    <div>
      <ul>
        <li>About Marvel</li>
        <li>Help / FAQs</li>
        <li>Careers</li>
        <li>Internships</li>
      </ul>
    </div>

    <div>
      <ul>
        <li>Advertise</li>
        <li>Marvel Insider</li>
        <li>Digital Comics</li>
      </ul>
    </div>

    <div className="logo">
      <img className='fb' src="https://www.svgrepo.com/show/382721/facebook.svg" alt="Facebook" />
      <img className='insta' src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" alt="Instagram" />
      <img className='twitter'src="https://www.svgrepo.com/show/349537/twitter.svg" alt="X" />
      <img className='yt' src="https://www.svgrepo.com/show/382710/youtube-you-tube-video.svg" alt="YouTube" />
    </div>

  </div>

  <p className="copyright">
    © 2026 E-PRODUCT. All Rights Reserved.
  </p>

</footer>
  );
};

export default memo(Footer);