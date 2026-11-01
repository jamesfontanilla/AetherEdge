-- Core Production Schema for AetherEdge Sovereign PaaS
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  owner_id TEXT NOT NULL,
  framework TEXT DEFAULT 'nextjs',
  repo_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metrics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT,
  event_type TEXT,
  latency_ms REAL,
  edge_pop TEXT,
  status_code INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'developer',
  tier TEXT DEFAULT 'pro',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Default Tenant
INSERT OR IGNORE INTO projects (id, name, slug, owner_id, framework, repo_url)
VALUES ('proj_01', 'AetherEdge Gateway', 'promptflow', 'usr_alex', 'nextjs', 'https://github.com/jamesfontanilla/AetherEdge');

INSERT OR IGNORE INTO users (id, email, role, tier)
VALUES ('usr_alex', 'jamesfontanilla.dev@proton.me', 'founder', 'pro');
