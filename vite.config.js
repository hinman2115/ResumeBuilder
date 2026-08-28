import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import handler from './api/statistics.js';

function vercelApiPlugin() {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (url.pathname === '/api/statistics' || url.pathname === '/api/statistics/') {
          // Parse request body for POST
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            req.body = body ? JSON.parse(body) : {};
            
            // Mock Vercel response helper methods
            res.status = function(code) {
              this.statusCode = code;
              return this;
            };
            res.json = function(data) {
              this.setHeader('Content-Type', 'application/json');
              this.end(JSON.stringify(data));
              return this;
            };
            
            try {
              await handler(req, res);
            } catch (err) {
              console.error('Dev API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Local API middleware execution error' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load env variables (including SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) from .env.local into process.env
  const env = loadEnv(mode, process.cwd(), '');
  process.env.SUPABASE_URL = env.SUPABASE_URL || process.env.SUPABASE_URL;
  process.env.SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    plugins: [react(), vercelApiPlugin()],
    server: {
      port: 3000,
      open: false
    }
  };
});
