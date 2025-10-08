import './css/Login.css';
import logo from "./assets/BBC FINAL LOGO.png"
function Loading() {
  return (
    <div className="loading-container">
      <picture>
        <img src={logo} alt="Loading..." className="loading-logo" />
      </picture>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default Loading;
