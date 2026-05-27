import { useState } from 'react';
import Ticker from '../components/Ticker';
import '../styles/Tienda.css';

const PRODUCTS = [
  {
    img: '/img/polera.webp',
    title: 'Polera 20 Aniversario',
    desc: 'Diseño exclusivo en algodón orgánico. Colores disponibles: negro, blanco y rojo.',
    price: '$18.000',
    badge: 'EDICIÓN LIMITADA',
  },
  {
    img: '/img/poleron.webp',
    title: 'Polerón Carnavalero',
    desc: 'Abrigo premium con el logo bordado. Ideal para los ensayos de invierno.',
    price: '$32.000',
    badge: 'BESTSELLER',
  },
];

const DONATION_AMOUNTS = [1000, 3000, 5000, 10000, 20000];

export default function Tienda() {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    const amount = selectedAmount || parseInt(customAmount.replace(/\D/g, ''), 10);
    if (!amount || amount < 500) { alert('Ingresa un monto válido (mínimo $500)'); return; }
    setDonated(true);
  };

  return (
    <>
      <Ticker text="🛍 Tienda Conmemorativa · Donaciones · 20 Aniversario · Apoya la cultura popular" />

      <div className="tienda-page">
        <div className="tienda-header">
          <h1>
            Tienda <span>&</span> Donaciones
          </h1>
          <p>
            Apoya la Escuela Carnavalera llevándote algo especial o haciendo una donación directa.
          </p>
        </div>

        <div className="tienda-layout">
          <section>
            <h2>🎪 Tienda Conmemorativa</h2>
            <div className="tienda-product-grid">
              {PRODUCTS.map(({ img, title, desc, price, badge }) => (
                <article key={title} className="tienda-product-card">
                  <div className="tienda-product-image">
                    <img src={img} alt={title} loading="lazy" />
                    {badge && <span className="tienda-product-badge">{badge}</span>}
                  </div>
                  <div className="tienda-product-info">
                    <h3 className="tienda-product-title">{title}</h3>
                    <p className="tienda-product-desc">{desc}</p>
                    <div className="tienda-product-footer">
                      <span className="tienda-product-price">{price}</span>
                      <button className="tienda-buy-btn">Comprar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="donaciones" className="tienda-donation-panel">
            <h2>❤️ Donaciones</h2>
            <p>Tu aporte directo sostiene los talleres, el archivo y la fiesta comunitaria.</p>

            {donated ? (
              <div className="tienda-donation-success">
                <div className="tienda-donation-success-icon">🎉</div>
                <h3 className="tienda-donation-success-title">¡Gracias por tu apoyo!</h3>
                <p>Tu donación impulsa la cultura carnavalera.</p>
              </div>
            ) : (
              <>
                <div className="tienda-donation-buttons">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      className={`tienda-donation-amount${selectedAmount === amt ? ' active' : ''}`}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                    >
                      ${amt.toLocaleString('es-CL')}
                    </button>
                  ))}
                </div>
                <div className="tienda-donation-form">
                  <input
                    type="text"
                    placeholder="Otro monto..."
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    className="tienda-donation-input"
                  />
                  <button className="tienda-donation-submit" onClick={handleDonate}>
                    💝 Donar ahora
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
