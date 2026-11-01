/**
 * @aether/edge — Universal Edge SDK
 * Consolidates the 8 primitives: db, storage, mail, auth, kv, cron, ai
 */

export interface AetherConfig {
  apiKey?: string;
  projectId?: string;
  endpoint?: string;
}

// 1. Relational SQL Database (D1 / SQLite)
export const db = {
  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const res = await fetch(`${getEndpoint()}/api/v1/db/query`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sql, params }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`[AetherDB] Query Failed: ${err}`);
    }
    const data = await res.json() as { results: T[] };
    return data.results;
  },

  async execute(sql: string, params: unknown[] = []): Promise<{ success: boolean; changes: number }> {
    const res = await fetch(`${getEndpoint()}/api/v1/db/execute`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ sql, params }),
    });
    if (!res.ok) throw new Error(`[AetherDB] Execute Failed: ${await res.text()}`);
    return (await res.json()) as { success: boolean; changes: number };
  }
};

// 2. Zero-Egress Storage (Backblaze B2 via Bandwidth Alliance)
export const storage = {
  async upload(path: string, data: Blob | ArrayBuffer | Uint8Array | string, options?: { contentType?: string; access?: 'public' | 'private' }) {
    const res = await fetch(`${getEndpoint()}/api/v1/storage/upload?path=${encodeURIComponent(path)}`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'content-type': options?.contentType || 'application/octet-stream',
        'x-aether-access': options?.access || 'public',
      },
      body: data,
    });
    if (!res.ok) throw new Error(`[AetherStorage] Upload Failed: ${await res.text()}`);
    return (await res.json()) as { url: string; key: string; size: number };
  },

  getUrl(path: string): string {
    return `${getEndpoint()}/_static/${path.replace(/^\//, '')}`;
  }
};

// 3. Outbound Mail (AWS SES Relay)
export const mail = {
  async send(params: { to: string | string[]; subject: string; html?: string; text?: string; from?: string }) {
    const res = await fetch(`${getEndpoint()}/api/v1/mail/send`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`[AetherMail] Mail Dispatch Failed: ${await res.text()}`);
    return (await res.json()) as { messageId: string; status: 'sent' | 'queued' };
  }
};

// 4. In-Memory KV Cache & Rate Limiting
export const kv = {
  async get<T = unknown>(key: string): Promise<T | null> {
    const res = await fetch(`${getEndpoint()}/api/v1/kv/${encodeURIComponent(key)}`, {
      headers: getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`[AetherKV] Get Failed: ${await res.text()}`);
    return (await res.json()) as T;
  },

  async set(key: string, value: unknown, options?: { ttl?: number }): Promise<void> {
    const res = await fetch(`${getEndpoint()}/api/v1/kv/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ value, ttl: options?.ttl }),
    });
    if (!res.ok) throw new Error(`[AetherKV] Set Failed: ${await res.text()}`);
  },

  async delete(key: string): Promise<void> {
    await fetch(`${getEndpoint()}/api/v1/kv/${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
  }
};

// 5. Sovereign Auth (Postveil Passkeys & OAuth Vault)
export const auth = {
  async verifySession(token: string) {
    const res = await fetch(`${getEndpoint()}/api/v1/auth/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return null;
    return (await res.json()) as { userId: string; email: string; provider: string };
  }
};

// 6. AI Gateway (Semantic Caching & LLM Proxy)
export const ai = {
  async chat(params: { model: string; messages: Array<{ role: string; content: string }>; cache?: boolean; temperature?: number }) {
    const res = await fetch(`${getEndpoint()}/api/v1/ai/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error(`[AetherAI] AI Gateway Error: ${await res.text()}`);
    return (await res.json()) as {
      id: string;
      choices: Array<{ message: { role: string; content: string } }>;
      cached: boolean;
      latencyMs: number;
    };
  }
};

function getEndpoint(): string {
  if (typeof process !== 'undefined' && process.env?.AETHER_GATEWAY_URL) {
    return process.env.AETHER_GATEWAY_URL.replace(/\/$/, '');
  }
  return 'https://gateway.aether.run';
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  const key = typeof process !== 'undefined' ? process.env?.AETHER_API_KEY : undefined;
  if (key) {
    headers['authorization'] = `Bearer ${key}`;
  }
  return headers;
}
