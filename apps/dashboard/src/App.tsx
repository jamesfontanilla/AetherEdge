import React from 'react';
import { Activity, Database, HardDrive, Shield, Mail, Zap, Terminal, Sparkles } from 'lucide-react';

export function Dashboard() {
  const metrics = [
    { label: "Edge Requests (24h)", value: "142,890", sub: "99.8% Cached", icon: Zap, color: "#10B981" },
    { label: "P95 Edge Latency", value: "18ms", sub: "310 Global PoPs", icon: Activity, color: "#06B6D4" },
    { label: "Relational D1 DB", value: "12.4 MB", sub: "SQLite Consensus", icon: Database, color: "#8B5CF6" },
    { label: "Zero-Egress B2", value: "1.4 GB", sub: "$0.00 Billed", icon: HardDrive, color: "#F59E0B" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090A0F', color: '#FFFFFF', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Top Header */}
      <header style={{ borderBottom: '1px solid #262B3F', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#10B981' }}>⚡ AetherEdge</span>
          <span style={{ color: '#4B5563' }}>/</span>
          <span style={{ fontSize: '14px', color: '#9CA3AF' }}>promptflow-production</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600 }}>
            Pro Developer Active
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} style={{ backgroundColor: '#12141D', border: '1px solid #262B3F', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{m.label}</span>
                  <Icon size={18} color={m.color} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{m.value}</div>
                <div style={{ fontSize: '12px', color: m.color }}>{m.sub}</div>
              </div>
            );
          })}
        </div>

        {/* The 8 Sovereign Primitives Status Matrix */}
        <div style={{ backgroundColor: '#12141D', border: '1px solid #262B3F', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>The 8 Architectural Primitives</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#1A1D2B', borderRadius: '8px', border: '1px solid #262B3F' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>⚡ Pillar 1: Edge Compute</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>V8 Isolates (35ms Wake)</div>
            </div>
            <div style={{ padding: '12px', background: '#1A1D2B', borderRadius: '8px', border: '1px solid #262B3F' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>🗄️ Pillar 2: Relational SQL</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Cloudflare D1 Raft Consensus</div>
            </div>
            <div style={{ padding: '12px', background: '#1A1D2B', borderRadius: '8px', border: '1px solid #262B3F' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>🪣 Pillar 3: Zero-Egress Storage</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>B2 + Bandwidth Alliance</div>
            </div>
            <div style={{ padding: '12px', background: '#1A1D2B', borderRadius: '8px', border: '1px solid #262B3F' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#10B981' }}>🔑 Pillar 4: Sovereign Auth</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Postveil Passkeys & Vault</div>
            </div>
          </div>
        </div>

        {/* Live Observability Terminal Preview */}
        <div style={{ backgroundColor: '#0D0E15', border: '1px solid #262B3F', borderRadius: '12px', padding: '20px', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#9CA3AF', fontSize: '13px' }}>
            <Terminal size={14} color="#10B981" />
            <span>LIVE EDGE LOG TAIL (WebSocket Stream)</span>
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', lineHeight: '1.8' }}>
            [12:54:01] 200 GET /api/v1/feed (14ms, SIN) - Edge Cache HIT<br/>
            [12:54:02] 200 POST /api/auth/verify (32ms, NRT) - Postveil Passkey Validated<br/>
            [12:54:04] 200 GET /_static/hero.webp (2ms, SJC) - B2 Zero-Egress Alliance Transfer
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
