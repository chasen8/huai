import sys, ccxt, pandas as pd, ta, json

symbol = sys.argv[1] if len(sys.argv) > 1 else 'BTC/USDT'
exchange = ccxt.binance()
ohlcv = exchange.fetch_ohlcv(symbol, timeframe='1h', limit=100)
df = pd.DataFrame(ohlcv, columns=['ts','open','high','low','close','volume'])
close = df['close']
macd = ta.trend.macd(close)
macdsignal = ta.trend.macd_signal(close)
rsi = ta.momentum.rsi(close)

vol_profile = df.groupby('close')['volume'].sum().sort_values(ascending=False)
support_zone = float(vol_profile.head(3).index.min())
resist_zone = float(vol_profile.head(3).index.max())
entry_price = float(df['close'].iloc[-1])
atr = ta.volatility.average_true_range(df['high'], df['low'], df['close'])
tp = round(entry_price + 1.5*atr.iloc[-1], 2)
sl = round(entry_price - 1.5*atr.iloc[-1], 2)
pattern = "MACD多頭" if macd.iloc[-1] > macdsignal.iloc[-1] else "MACD空頭"
advice = "可偏多進場" if macd.iloc[-1] > macdsignal.iloc[-1] and rsi.iloc[-1] > 50 else "觀望/偏空"

print(json.dumps({
    "symbol": symbol,
    "pattern": pattern,
    "support_zone": support_zone,
    "resist_zone": resist_zone,
    "entry_price": entry_price,
    "tp": tp,
    "sl": sl,
    "advice": advice
}, ensure_ascii=False))
