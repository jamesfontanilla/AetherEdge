# Cloudflare Infrastructure as Code (Terraform)
# Defines D1 Relational DB, KV Namespaces, and Bandwidth Alliance Gateway Bindings

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40"
    }
  }
}

variable "cloudflare_account_id" {
  type        = string
  description = "The Cloudflare Account ID for AetherEdge tenant"
}

# 1. Primary Cloudflare D1 Relational SQLite Database
resource "cloudflare_d1_database" "aether_primary_d1" {
  account_id = var.cloudflare_account_id
  name       = "aether-primary-d1"
}

# 2. Global Workers KV Namespace for Fast Microsecond State
resource "cloudflare_workers_kv_namespace" "aether_state_kv" {
  account_id = var.cloudflare_account_id
  title      = "aether-state-kv"
}
