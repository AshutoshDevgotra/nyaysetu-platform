import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      res.status(200).json({ result: data.result });
    } catch (error) {
      res.status(500).json({ error: 'Error occurred while processing the query.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
