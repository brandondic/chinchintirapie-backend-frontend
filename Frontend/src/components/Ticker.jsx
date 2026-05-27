import '../styles/Ticker.css';

export default function Ticker({ text }) {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        <span className="ticker-content">{text}</span>
        <span className="ticker-content">{text}</span>
      </div>
    </div>
  );
}
