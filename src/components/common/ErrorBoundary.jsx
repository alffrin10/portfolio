import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          margin: '20px 0',
          border: '1px solid var(--red)',
          background: 'rgba(200, 160, 160, 0.05)',
          color: 'var(--red)',
          fontFamily: 'monospace'
        }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>⚠️ Technical Documentation Unavailable</h3>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            A rendering error occurred while parsing the technical specifications for this section.
          </p>
          <pre style={{ marginTop: '16px', fontSize: '12px', opacity: 0.6 }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
