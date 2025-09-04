import 'dotenv/config';
import http from 'http';
import { neon } from '@neondatabase/serverless';

// Conexão com o banco de dados Neon
export const sql = neon(process.env.DATABASE_URL);

// Este é o código do servidor HTTP que você já tinha.
// Ele foi mantido aqui para que o arquivo seja executável.
const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version);
  } catch (error) {
    console.error('Erro ao conectar ou consultar o banco de dados:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor.');
  }
};

const PORT = process.env.PORT || 3000;

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});