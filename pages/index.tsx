import Link from 'next/link';
import { useEffect, useState } from 'react';

type Recommend = { symbol: string; direction: string };

export default function Home() {
  const [list, setList] = useState<Recommend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/recommend')
      .then(res => res.json())
      .then(data => { setList(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: '#21222a', color: '#fff', minHeight: '100vh', padding: 40 }}>
      <nav style={{ display: 'flex', gap: 40, fontSize: 18, marginBottom: 30 }}>
        <Link href="/analyze" style={{ color: '#fff' }}>即時幣種分析</Link>
        <Link href="/" style={{ color: '#fff' }}>幣種推薦</Link>
      </nav>
      <h2 style={{ color: '#33ccff', fontWeight: 700 }}>💎 今日 AI 推薦幣種</h2>
      {loading ? (
        <p>讀取中...</p>
      ) : list.length === 0 ? (
        <p style={{ color: 'orange' }}>⚠️ 無法取得推薦資料</p>
      ) : (
        <ul>
          {list.map(({ symbol, direction }) => (
            <li key={symbol} style={{ fontSize: 18, marginTop: 8 }}>
              <b>{symbol}</b> — <span style={{ color: direction === 'LONG' ? '#42f563' : '#ff4545' }}>{direction}</span>
            </li>
          ))}
        </ul>
      )}
      <footer style={{ marginTop: 50, fontSize: 12, color: '#888' }}>Powered by AI Coin Screener | MACD + RSI</footer>
    </main>
  );
}
