import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const symbol = req.query.symbol as string || 'BTC/USDT';
  exec(`python3 analyze.py "${symbol}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: '分析錯誤' });
    try {
      res.status(200).json(JSON.parse(stdout));
    } catch (e) {
      res.status(500).json({ error: 'JSON解析失敗' });
    }
  });
}
