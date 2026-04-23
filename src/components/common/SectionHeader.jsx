import { useInView } from '../../hooks/useInView';

export default function SectionHeader({ number, title }) {
  const [ref, inView] = useInView();

  return (
    <div className={`sh fade${inView ? ' in' : ''}`} ref={ref}>
      <h2 className="sh-t">{title}</h2>
      <div className="sh-l" aria-hidden="true" />
    </div>
  );
}
