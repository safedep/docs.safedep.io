---
sidebar_position: 5
title: 🔍 Audit Terraform Provider Inventory for Supply Chain Risks
---

:::info
To follow this guide you need a SafeDep Cloud API Key and Tenant Identifier.
See [Cloud Quickstart](../cloud/quickstart.md) on how to onboard to SafeDep Cloud and get an API key.
:::

In this guide, we will look at discovering [Terraform providers](https://developer.hashicorp.com/terraform/language/providers) used in a Terraform project. We will synchronize the inventory (BOM) with SafeDep Cloud and execute queries to discover unofficial providers that may pose a risk to the security of developer, cloud and CI/CD infrastructure.

## Scan and Discover Terraform Providers

:::info
`vet` must be installed to run this scan. See [quickstart](../quickstart.md) for `vet` installation options.
:::

Run `vet` on your Terraform code base to scan for Terraform providers. The terraform project must be initialized i.e. `.terraform.lock.hcl` must be available in the project directory.

```shell
vet scan -D /path/to/terraform-code \
  --report-sync \
  --report-sync-project gh/test/infra1 \
  --report-sync-project-version main
```

## Query by Terraform Provider Insights

:::info
We will use SafeDel Cloud SQL queries to filter results. See [SafeDep Cloud Quickstart](../cloud/quickstart.md) for more details
:::

Query for unofficial Terraform providers

```shell
vet cloud query execute --sql "
  select projects.name, projects.version, packages.name, packages.version 
    from projects 
      where terraform_providers.tier != 'official'
"
```

Example response generated from our test repository

```shell
┌───────────────────────────────────────────┬──────────────────┬────────────────┬──────────────────┐
│ PACKAGES.NAME                             │ PACKAGES.VERSION │ PROJECTS.NAME  │ PROJECTS.VERSION │
├───────────────────────────────────────────┼──────────────────┼────────────────┼──────────────────┤
│ registry.terraform.io/hetznercloud/hcloud │ 1.48.0           │ gh/test/infra1 │ main             │
├───────────────────────────────────────────┼──────────────────┼────────────────┼──────────────────┤
│ registry.terraform.io/hetznercloud/hcloud │ 1.48.0           │ gh/test/infra1 │ main             │
├───────────────────────────────────────────┼──────────────────┼────────────────┼──────────────────┤
│ registry.terraform.io/hetznercloud/hcloud │ 1.48.0           │ gh/test/infra1 │ main             │
└───────────────────────────────────────────┴──────────────────┴────────────────┴──────────────────┘%
```

List the query schema to see all queryable and filterable columns for Terraform providers

```shell
vet cloud query schema
```

## Reference

- https://about.gitlab.com/blog/2022/06/01/terraform-as-part-of-software-supply-chain-part1-modules-and-providers/