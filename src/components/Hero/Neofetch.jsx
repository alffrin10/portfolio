import { useEffect, useRef } from 'react';

const DARK_SWATCHES = ['#f38ba8','#fab387','#f9e2af','#a6e3a1','#94e2d5','#74c7ec','#89b4fa','#cba6f7','#f5c2e7'];
const LIGHT_SWATCHES = ['#dc322f','#cb4b16','#b58900','#859900','#2aa198','#268bd2','#6c71c4','#d33682','#073642'];

export default function Neofetch({ data, theme }) {
  const nf = data.neofetch;
  const rowsRef = useRef([]);

  // Line-by-line reveal
  useEffect(() => {
    rowsRef.current.forEach((el, i) => {
      if (el) {
        setTimeout(() => el.classList.add('show'), i * 80 + 200);
      }
    });
  }, []);

  const themeLabel = theme === 'void' ? 'Void' : 'Luminus';
  const swatches = theme === 'void' ? DARK_SWATCHES : LIGHT_SWATCHES;

  return (
    <div className="nf" role="complementary" aria-label="Terminal info card">
      <div className="nf-tb">
        <div className="tb tb-r" aria-hidden="true" />
        <div className="tb tb-y" aria-hidden="true" />
        <div className="tb tb-g" aria-hidden="true" />
        <span className="nf-lbl">{nf.user}@{nf.host} ~ neofetch</span>
      </div>
      <div className="nf-body">
        <div className="nf-usr">
          <span className="nu">{nf.user}</span>
          <span className="nat">@</span>
          <span className="nh">{nf.host}</span>
        </div>
        <div className="ndiv">──────────────────────────</div>

        {nf.rows.map((row, i) => (
          <div
            key={i}
            className="nr"
            ref={el => rowsRef.current[i] = el}
            style={{ transitionDelay: `${i * .06}s` }}
          >
            <span className="nk">{row.key}</span>
            <span className="nc">:</span>
            <span className={`nv${row.colorClass ? ' ' + row.colorClass : ''}`}>{row.value}</span>
          </div>
        ))}

        {/* Theme row */}
        <div
          className="nr"
          ref={el => rowsRef.current[nf.rows.length] = el}
          style={{ transitionDelay: `${nf.rows.length * .06}s` }}
        >
          <span className="nk">theme   </span>
          <span className="nc">:</span>
          <span className="nv gr">{themeLabel}</span>
        </div>

        <div className="nswatches">
          {swatches.map(c => (
            <div key={c} className="nsw" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

