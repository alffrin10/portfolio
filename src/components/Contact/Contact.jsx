import { useInView } from '../../hooks/useInView';
import SectionHeader from '../common/SectionHeader';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Contact({ theme }) {
  const data = usePortfolio();
  const meta = data.meta;
  const [ref1, in1] = useInView();
  const [ref2, in2] = useInView();
  const [ref3, in3] = useInView();
  const [ref4, in4] = useInView();
  const [ref5, in5] = useInView();
  const [ref6, in6] = useInView();

  return (
    <section id="contact" aria-label="Contact">
      <SectionHeader number="05" title="Contact" />

      <div className="contact-grid">
        <a
          href={`mailto:${meta.email}`}
          className={`cbox em fade${in1 ? ' in' : ''}`}
          ref={ref1}
          aria-label="Email"
        >
          <div className="cb-top">
            <span className="cb-ic">✉️</span>
            <span className="cb-badge">preferred</span>
          </div>
          <div className="cb-lbl">email</div>
          <div className="cb-val">{meta.email}</div>
          <div className="cb-arr">→ send message</div>
        </a>

        <a
          href={meta.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`cbox li fade${in2 ? ' in' : ''}`}
          ref={ref2}
          style={{ transitionDelay: '.09s' }}
          aria-label="LinkedIn"
        >
          <div className="cb-top">
            <span className="cb-ic">💼</span>
            <span className="cb-badge">connect</span>
          </div>
          <div className="cb-lbl">linkedin</div>
          <div className="cb-val">{meta.linkedin.replace('https://', '')}</div>
          <div className="cb-arr">→ view profile</div>
        </a>

        <a
          href="https://github.com/alffrin10"
          target="_blank"
          rel="noopener noreferrer"
          className={`cbox gh fade${in6 ? ' in' : ''}`}
          ref={ref6}
          style={{ transitionDelay: '.13s' }}
          aria-label="GitHub"
        >
          <div className="cb-top">
            <span className="cb-ic">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style={{ display: 'block' }}><path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943"></path></svg>
            </span>
            <span className="cb-badge">code</span>
          </div>
          <div className="cb-lbl">github</div>
          <div className="cb-val">github.com/alffrin10</div>
          <div className="cb-arr">→ view repos</div>
        </a>

        <a
          href={`tel:${meta.phone.replace(/\s/g, '')}`}
          className={`cbox ph fade${in3 ? ' in' : ''}`}
          ref={ref3}
          style={{ transitionDelay: '.17s' }}
          aria-label="Phone"
        >
          <div className="cb-top">
            <span className="cb-ic">📞</span>
            <span className="cb-badge">direct</span>
          </div>
          <div className="cb-lbl">phone</div>
          <div className="cb-val">{meta.phone}</div>
          <div className="cb-arr">→ call now</div>
        </a>
      </div>

      <div className="contact-bot">
        <div
          className={`lcard fade${in4 ? ' in' : ''}`}
          ref={ref4}
          style={{ transitionDelay: '.1s' }}
        >
          <div className="lcard-ic">📍</div>
          <div>
            <div className="ll">location</div>
            <div className="lv">{meta.location}</div>
          </div>
        </div>

        <div
          className={`scard fade${in5 ? ' in' : ''}`}
          ref={ref5}
          style={{ transitionDelay: '.2s' }}
        >
          <div className="sc-row">
            <div className="sc-dot" />
            <div>
              <div className="scl">status</div>
              <div className="scv">Available for Work</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
