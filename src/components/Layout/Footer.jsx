export default function Footer({ theme }) {
  return (
    <footer>
      <span className="accent">Alffrin Regi</span> &middot;{' '}
      <span className="accent">{theme === 'void' ? 'Void' : 'Luminus'}</span>
    </footer>
  );
}

