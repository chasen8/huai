import Link from 'next/link';
import { useState } from 'react';

export default function Analyze() {
  const [symbol, setSymbol] = useState('');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true); setReport(null);
    const res = await fetch(`/api/analyze?symbol=${symbol}`);
    const data = await res.json();
    setReport(data); setLoading(false);
  };

  return (
    <main style={{ background: '#21222a', color: '#fff', minHeight: '100vh', padding: 40 }}>
      <nav style={{ display: 'flex', gap: 40, fontSize: 18, marginBottom: 30 }}>
        <Link href="/analyze" style={{ color: '#fff' }}>即時幣種分析</Link>
        <Link href="/" style={{ color: '#fff' }}>幣種推薦</Link>
      </nav>
      <h2 style={{ color: '#33ccff', fontWeight: 700 }}>🔍 即時幣種分析</h2>
      <input value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())}
        style={{ color: '#222', padding: 8, borderRadius: 4, marginRight: 12 }}
        placeholder="請輸入幣種 (如 BTC/USDT)" />
      <button onClick={handleAnalyze} disabled={loading || !symbol}
        style={{ background: '#33ccff', color: '#222', padding: '8px 16px', borderRadius: 4 }}>
        {loading ? "分析中..." : "分析"}
      </button>
      {report && (
        <div style={{ background: '#2a2b36', padding: 24, borderRadius: 8, marginTop: 32 }}>
          <div>幣種：<b>{report.symbol}</b></div>
          <div>型態分析：{report.pattern}</div>
          <div>支撐區：{report.support_zone}</div>
          <div>壓力區：{report.resist_zone}</div>
          <div>建議進場價：{report.entry_price}</div>
          <div>TP：{report.tp}</div>
          <div>SL：{report.sl}</div>
          <div>分析建議：<b>{report.advice}</b></div>
        </div>
      )}
    </main>
  );
}
