export default function Ticker({ text }) {
  return (
    <div className="ticker" aria-hidden="true">
      <span className="ticker-inner">{text}&nbsp;&nbsp;{text}</span>
    </div>
  );
}
