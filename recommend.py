import ccxt
import pandas as pd
import ta
import json

symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT', 'AVAX/USDT', 'DOGE/USDT', 'XRP/USDT', 'ADA/USDT', 'OP/USDT', 'LINK/USDT', 'PEPE/USDT', 'ARB/USDT', 'UNI/USDT', 'MATIC/USDT', 'NOT/USDT']
exchange = ccxt.binance()
recommend_list = []

for symbol in symbols:
    try:
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe='1h', limit=100)
        df = pd.DataFrame(ohlcv, columns=['timestamp','open','high','low','close','volume'])
        close = df['close']
        macd = ta.trend.macd(close)
        macdsignal = ta.trend.macd_signal(close)
        rsi = ta.momentum.rsi(close)
        if (macd.iloc[-1] > macdsignal.iloc[-1]) and (rsi.iloc[-1] > 50):
            recommend_list.append({'symbol': symbol, 'direction': 'LONG'})
        elif (macd.iloc[-1] < macdsignal.iloc[-1]) and (rsi.iloc[-1] < 50):
            recommend_list.append({'symbol': symbol, 'direction': 'SHORT'})
    except Exception as e:
        print(symbol, 'error:', e)

recommend_list = recommend_list[:15]
with open('public/recommend.json', 'w', encoding='utf-8') as f:
    json.dump(recommend_list, f, ensure_ascii=False, indent=2)
