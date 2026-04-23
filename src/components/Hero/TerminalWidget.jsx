import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * TerminalWidget — Interactive terminal (FEATURE 1)
 * Boot animation removed per user feedback.
 * Starts cleanly with a single hint line.
 */
const PROMPT = 'alffrin@portfolio:~$';

function buildOutput(cmd, data) {
  const { meta, skills, experience, projects } = data;
  switch (cmd.trim().toLowerCase()) {
    case 'help':
      return [
        { type: 'h', text: 'Available commands:' },
        { type: 'kv', key: 'whoami     ', val: 'About me' },
        { type: 'kv', key: 'projects   ', val: 'List projects' },
        { type: 'kv', key: 'skills     ', val: 'Technical skills' },
        { type: 'kv', key: 'experience ', val: 'Work history' },
        { type: 'kv', key: 'contact    ', val: 'Get in touch' },
        { type: 'kv', key: 'clear      ', val: 'Clear terminal' },
      ];
    case 'whoami':
      return [
        { type: 'h',   text: `>> ${meta.name}` },
        { type: 'out', text: meta.description },
        { type: 'blank' },
        { type: 'kv', key: 'location', val: meta.location },
        { type: 'kv', key: 'status  ', val: meta.availabilityStatus },
      ];
    case 'projects':
      return [
        { type: 'h', text: '>> Projects' },
        ...projects.map(p => ({ type: 'kv', key: `${p.icon} ${p.name}`, val: p.tags.slice(0, 2).join(' · ') })),
      ];
    case 'skills':
      return [
        { type: 'h', text: '>> Skills' },
        ...skills.map(g => ({ type: 'kv', key: g.group.replace(/_/g, ' '), val: g.items.join(', ') })),
      ];
    case 'experience':
      return [
        { type: 'h', text: '>> Experience' },
        ...experience.map(e => ({ type: 'kv', key: e.company, val: `${e.role} · ${e.date}` })),
      ];
    case 'contact':
      return [
        { type: 'h',  text: '>> Contact' },
        { type: 'kv', key: 'email   ', val: meta.email },
        { type: 'kv', key: 'phone   ', val: meta.phone },
        { type: 'kv', key: 'linkedin', val: meta.linkedin },
      ];
    case '':
      return [];
    default:
      return [{ type: 'err', text: `command not found: '${cmd}'. type 'help' for available commands.` }];
  }
}

function Line({ line }) {
  if (line.type === 'blank') return <span className="tw-blank" />;
  if (line.type === 'prompt') {
    return (
      <div className="tw-line">
        <span className="tw-prompt">{PROMPT}&nbsp;</span>
        <span className="tw-cmd">{line.text}</span>
      </div>
    );
  }
  if (line.type === 'h')  return <div className="tw-line"><span className="tw-out-h">{line.text}</span></div>;
  if (line.type === 'kv') {
    return (
      <div className="tw-line tw-out">
        <span className="tw-out-key">{line.key}</span>
        <span style={{ color: 'var(--ov1)' }}>&nbsp;»&nbsp;</span>
        <span className="tw-out-val">{line.val}</span>
      </div>
    );
  }
  if (line.type === 'err') return <div className="tw-line"><span className="tw-out" style={{ color: '#f38ba8' }}>{line.text}</span></div>;
  return <div className="tw-line tw-out">{line.text}</div>;
}

export default function TerminalWidget({ data }) {
  // Start with a clean single hint — no boot animation
  const [history, setHistory] = useState([
    { type: 'out', text: "type 'help' to explore the portfolio" },
  ]);
  const [input, setInput] = useState('');
  const inputRef   = useRef(null);
  const bodyRef    = useRef(null);
  const cmdHistory = useRef([]);
  const cmdIdx     = useRef(-1);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const runCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (trimmed === 'clear') { setHistory([]); setInput(''); return; }
    const output = buildOutput(trimmed, data);
    setHistory(h => [...h, { type: 'prompt', text: trimmed }, ...output, { type: 'blank' }]);
    if (trimmed) { cmdHistory.current = [trimmed, ...cmdHistory.current.slice(0, 49)]; cmdIdx.current = -1; }
    setInput('');
  }, [data]);

  function handleKey(e) {
    if (e.key === 'Enter') { runCommand(input); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(cmdIdx.current + 1, cmdHistory.current.length - 1);
      cmdIdx.current = next;
      if (cmdHistory.current[next] !== undefined) setInput(cmdHistory.current[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(cmdIdx.current - 1, -1);
      cmdIdx.current = next;
      setInput(next === -1 ? '' : cmdHistory.current[next]);
    }
  }

  const SHORTCUTS = ['help', 'projects', 'skills', 'experience', 'whoami', 'clear'];

  return (
    <div className="terminal-wrap">
      <div className="terminal-widget" onClick={() => inputRef.current?.focus()} role="application" aria-label="Interactive terminal">
        <div className="tw-topbar" aria-hidden="true">
          <div className="tb tb-r" /><div className="tb tb-y" /><div className="tb tb-g" />
          <span className="tw-title">terminal — alffrin@portfolio</span>
        </div>
        <div className="tw-body" ref={bodyRef} aria-live="polite">
          {history.map((line, i) => <Line key={i} line={line} />)}
        </div>
        <div className="tw-input-row">
          <span className="tw-input-prompt">{PROMPT}&nbsp;</span>
          <input
            ref={inputRef}
            className="tw-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
        </div>
        <div className="tw-shortcut-bar" role="toolbar" aria-label="Quick commands">
          {SHORTCUTS.map(cmd => (
            <button key={cmd} className="tw-shortcut" onClick={() => runCommand(cmd)}>{cmd}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
