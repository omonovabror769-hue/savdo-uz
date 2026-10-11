import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Sahifada kutilmagan xato chiqsa — oq ekran o'rniga tushunarli xabar va tiklash tugmalari ko'rsatiladi.
 * Xato matni ekranda ko'rinadi, shuning uchun uni skrinshot qilib yuborish mumkin.
 */
export default class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('savdo.uz xato:', error, info.componentStack);
  }

  componentDidUpdate(prev: { resetKey?: string }) {
    // Boshqa sahifaga o'tilganda xatoni tozalab, qayta urinib ko'ramiz
    if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const clearData = () => {
      try {
        Object.keys(localStorage).filter((k) => k.startsWith('savdo.')).forEach((k) => localStorage.removeItem(k));
      } catch {
        /* ignore */
      }
      location.hash = '#/';
      location.reload();
    };
    return (
      <div className="crash">
        <h2>Sahifani ochishda xato yuz berdi</h2>
        <p>Ошибка при открытии страницы · Something went wrong</p>
        <pre>{String(error?.message || error)}</pre>
        <div className="row-gap">
          <button className="btn btn-brand" onClick={() => location.reload()}>Qayta yuklash</button>
          <button className="btn btn-ghost" onClick={() => { location.hash = '#/'; location.reload(); }}>Bosh sahifa</button>
          <button className="btn btn-ghost" onClick={clearData}>Saqlangan ma'lumotlarni tozalash</button>
        </div>
      </div>
    );
  }
}
