import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server(
  {
    name: "aetheredge-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "aether_deploy",
        description: "Deploy current project to AetherEdge global isolates and return live preview URL",
        inputSchema: {
          type: "object",
          properties: {
            environment: { type: "string", enum: ["production", "preview"], default: "production" }
          }
        }
      },
      {
        name: "aether_db_schema_push",
        description: "Declaratively push database schema updates to Cloudflare D1 with automatic safety checks",
        inputSchema: {
          type: "object",
          properties: {
            schema_sql: { type: "string", description: "The SQL DDL schema definitions" }
          },
          required: ["schema_sql"]
        }
      },
      {
        name: "aether_db_query",
        description: "Execute a read-only query on tenant D1 database for agent debugging",
        inputSchema: {
          type: "object",
          properties: {
            sql: { type: "string", description: "SQL SELECT statement" }
          },
          required: ["sql"]
        }
      },
      {
        name: "aether_tail_logs",
        description: "Inspect live runtime logs and stack traces from edge nodes",
        inputSchema: {
          type: "object",
          properties: {
            lines: { type: "number", default: 20 },
            filter_status: { type: "string", description: "Filter by HTTP status e.g. 5xx" }
          }
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "aether_deploy") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "success",
            deploymentUrl: "https://vibe-app.alex.aether.run",
            latencyP95: "18ms",
            popsActive: 310,
            deployedAt: new Date().toISOString()
          }, null, 2)
        }
      ]
    };
  }

  if (name === "aether_tail_logs") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify([
            { timestamp: new Date().toISOString(), status: 200, method: "GET", path: "/api/products", duration: "12ms" },
            { timestamp: new Date().toISOString(), status: 200, method: "POST", path: "/api/auth", duration: "35ms" }
          ], null, 2)
        }
      ]
    };
  }

  return {
    content: [{ type: "text", text: `Tool ${name} executed successfully.` }]
  };
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch(console.error);
