import { useState } from 'react';
import Ticker from '../components/Ticker';

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

      <div style={{
        background: 'var(--crema)',
        padding: '5rem 2rem',
        minHeight: '100vh',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'Bangers, cursive', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', letterSpacing: 3, color: 'var(--oscuro)' }}>
            Tienda <span style={{ color: 'var(--rojo)' }}>&</span> Donaciones
          </h1>
          <p style={{ color: '#6a4c35', maxWidth: 600, margin: '.8rem auto 0', lineHeight: 1.7 }}>
            Apoya la Escuela Carnavalera llevándote algo especial o haciendo una donación directa.
          </p>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>

          {/* TIENDA */}
          <section>
            <h2 style={{ fontFamily: 'Bangers, cursive', fontSize: '2.4rem', letterSpacing: 2, borderLeft: '6px solid var(--rojo)', paddingLeft: '1rem', marginBottom: '2rem' }}>
              🎪 Tienda Conmemorativa
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {PRODUCTS.map(({ img, title, desc, price, badge }) => (
                <article key={title} style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,.12)',
                  transition: 'transform .3s, box-shadow .3s',
                }}>
                  <div style={{ position: 'relative' }}>
                    <img src={img} alt={title} style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} loading="lazy" />
                    {badge && (
                      <span style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'var(--rojo)', color: '#fff',
                        borderRadius: 20, padding: '.25rem .75rem',
                        fontSize: '.72rem', fontWeight: 800, letterSpacing: 1.5,
                      }}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.4rem', color: 'var(--oscuro)', marginBottom: '.4rem' }}>{title}</h3>
                    <p style={{ color: '#6a4c35', fontSize: '.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Bangers, cursive', fontSize: '1.6rem', color: 'var(--rojo)', letterSpacing: 1 }}>{price}</span>
                      <button style={{
                        background: 'var(--oscuro)', color: 'var(--amarillo-e)',
                        border: 'none', borderRadius: 10, padding: '.6rem 1.4rem',
                        fontFamily: 'Nunito, sans-serif', fontWeight: 800, cursor: 'pointer',
                        transition: 'background .2s',
                      }}>
                        Comprar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* DONACIONES */}
          <section id="donaciones" style={{
            background: 'linear-gradient(135deg, var(--morado-o) 0%, #2a0a30 100%)',
            borderRadius: 24,
            padding: '3rem 2rem',
            color: '#fff',
          }}>
            <h2 style={{ fontFamily: 'Bangers, cursive', fontSize: '2.4rem', letterSpacing: 2, color: 'var(--amarillo-e)', marginBottom: '.5rem' }}>
              ❤️ Donaciones
            </h2>
            <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: '2rem', maxWidth: 500 }}>
              Tu aporte directo sostiene los talleres, el archivo y la fiesta comunitaria.
            </p>

            {donated ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.8rem', color: 'var(--amarillo-e)' }}>
                  ¡Gracias por tu apoyo!
                </h3>
                <p style={{ color: 'rgba(255,255,255,.7)' }}>Tu donación impulsa la cultura carnavalera.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.8rem', marginBottom: '1.5rem' }}>
                  {DONATION_AMOUNTS.map((amt) => (
                    <button key={amt}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                      style={{
                        padding: '.6rem 1.4rem',
                        borderRadius: 12,
                        border: `2px solid ${selectedAmount === amt ? 'var(--amarillo-e)' : 'rgba(255,255,255,.25)'}`,
                        background: selectedAmount === amt ? 'var(--amarillo-e)' : 'transparent',
                        color: selectedAmount === amt ? 'var(--morado-o)' : '#fff',
                        fontFamily: 'Bangers, cursive',
                        fontSize: '1.1rem',
                        letterSpacing: 1,
                        cursor: 'pointer',
                        transition: 'all .2s',
                      }}>
                      ${amt.toLocaleString('es-CL')}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Otro monto..."
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                    style={{
                      padding: '.65rem 1rem',
                      borderRadius: 10,
                      border: '2px solid rgba(255,255,255,.25)',
                      background: 'rgba(255,255,255,.08)',
                      color: '#fff',
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '.95rem',
                      outline: 'none',
                      flex: 1,
                      minWidth: 160,
                    }}
                  />
                  <button onClick={handleDonate} style={{
                    background: 'var(--rojo)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    padding: '.7rem 2rem',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background .2s',
                    whiteSpace: 'nowrap',
                  }}>
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
