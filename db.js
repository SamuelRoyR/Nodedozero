import 'dotenv/config'
import http from 'http'
import { Pool } from '@neondatabase/postgres'

// Conexão com o banco de dados Neon usando um Pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const requestHandler = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT version()');
    const { version } = result.rows[0];
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version);
  } catch (error) {
    console.error('Erro ao conectar ou consultar o banco de dados:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor.');
  } finally {
    if (client) {
      client.release();
    }
  }
};

const PORT = process.env.PORT || 3333

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});