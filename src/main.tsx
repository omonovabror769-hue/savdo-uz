import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { applyContent, loadContent } from './admin/content';
import './styles.css';

// Brauzer tarjimoni (Google Translate) yoki kengaytmalar sahifa matnini o'zgartirsa,
// React tugunni o'chira olmay qulab tushmasligi uchun himoya.
if (typeof Node === 'function' && Node.prototype) {
  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child) as T;
  };
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return origInsert.call(this, node, null) as T;
    return origInsert.call(this, node, ref) as T;
  };
}

// Admin tahrirlarini (content.json) yuklab, keyin saytni chizamiz
loadContent().then((content) => {
  applyContent(content);
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App content={content} />
    </StrictMode>,
  );
});
