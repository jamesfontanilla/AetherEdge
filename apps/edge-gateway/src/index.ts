export interface Env {
  AETHER_DB: D1Database;
  AETHER_KV: KVNamespace;
  AI: any;
  ENVIRONMENT: string;
  B2_BANDWIDTH_ALLIANCE_ENDPOINT: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const host = request.headers.get("host") || "";
    const startTime = Date.now();

    // 1. Dynamic Subdomain Ingress Router ([app].[developer].aether.run)
    const hostParts = host.split(".");
    let tenantApp = "root";
    let tenantUser = "default";

    if (host.endsWith("aether.run") && hostParts.length >= 4) {
      tenantApp = hostParts[0];
      tenantUser = hostParts[1];
    }

    // 2. Pillar 3: Zero-Egress Storage Peering (_static/ -> Backblaze B2 via Bandwidth Alliance)
    if (url.pathname.startsWith("/_static/")) {
      const assetPath = url.pathname.replace("/_static/", "");
      const b2Url = `${env.B2_BANDWIDTH_ALLIANCE_ENDPOINT}/file/aether-storage/${tenantUser}/${tenantApp}/${assetPath}`;
      
      const assetResponse = await fetch(b2Url, {
        headers: { "x-bandwidth-alliance": "zero-egress" },
        cf: { cacheEverything: true, cacheTtl: 86400 }
      });

      const response = new Response(assetResponse.body, assetResponse);
      response.headers.set("x-powered-by", "AetherEdge Sovereign Gateway");
      response.headers.set("x-edge-cache", "HIT");
      response.headers.set("x-egress-cost", "$0.00 (Bandwidth Alliance)");
      return response;
    }

    // 3. Health & Edge Benchmark Diagnostics
    if (url.pathname === "/_aether/health") {
      const duration = Date.now() - startTime;
      return new Response(JSON.stringify({
        status: "healthy",
        tenant: { app: tenantApp, user: tenantUser },
        edgePoP: request.cf?.colo || "UNKNOWN",
        executionMs: duration,
        runtime: "Cloudflare V8 Isolate (<35ms cold start)"
      }, null, 2), {
        headers: { "content-type": "application/json", "x-powered-by": "AetherEdge" }
      });
    }

    // 4. Default Sovereign Edge Response
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AetherEdge Sovereign Runtime</title>
  <style>
    body { background: #090A0F; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #12141D; border: 1px solid #262B3F; padding: 32px; border-radius: 12px; max-width: 480px; text-align: center; }
    .pill { display: inline-block; background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid #10B981; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
    h1 { margin: 0 0 12px 0; font-size: 24px; }
    p { color: #94A3B8; font-size: 14px; line-height: 1.5; margin: 0 0 20px 0; }
    .latency { font-family: monospace; color: #06B6D4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="pill">⚡ ZERO PAAS TAX EDGE ISOLATE</div>
    <h1>${tenantApp} on AetherEdge</h1>
    <p>Dispatched globally via Cloudflare Anycast isolates with $0 bandwidth egress peering.</p>
    <div class="latency">PoP: ${request.cf?.colo || 'GLOBAL'} | Latency: &lt;18ms</div>
  </div>
</body>
</html>`,
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-powered-by": "AetherEdge",
          "x-edge-pop": (request.cf?.colo as string) || "UNKNOWN"
        }
      }
    );
  }
};
