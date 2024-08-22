import '../App.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">Wellness Synergy</p>
          <p className="footer-text">Contact phone: (123)-123-1234</p>
          <p className="footer-text">Email: xrayplatoon@xray.com</p>
          <p className="footer-text">&copy; 2024 Wellness Synergy. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <div className="footer-cube-container">
            <div className="footer-cube">
              <div className="face front">Balance</div>
              <div className="face back">Thrive</div>
              <div className="face right">Sustain</div>
              <div className="face left">Vitalize</div>
              <div className="face top">Nourish</div>
              <div className="face bottom">Nourish</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
