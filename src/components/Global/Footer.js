import React, { Component } from 'react';
import './css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className = "Footer">
      <footer>
          <p className = "footer-links">
            <a href = "https://github.com/RoxanaCS/pretrabajo-react" target = "_blank">View Source on Github</a>
            <span>  /  </span>
            <a href = "https://www.google.cl/" target = "_blank">Need any help?</a>
          </p>
          <p>&copy; 2017 <strong>Copyright</strong> - E-commerce React</p>
      </footer>
      </div>
    );
  }
}

export default Footer;
