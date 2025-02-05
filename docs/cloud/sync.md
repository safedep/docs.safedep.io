---
sidebar_position: 4
title: 💻 Cloud Sync
---

This document describes how to synchronize data from `vet` to SafeDep Cloud.
Following options are available:

1. Using `vet` cli
2. Using [vet-action](https://github.com/safedep/vet-action) GitHub action

## Using `vet` cli

[vet](https://github.com/safedep/vet) configured with SafeDep Cloud can be used
to sync data, including policy violations, to SafeDep Cloud. Refer to
[quickstart](./quickstart.md) for more information on how to configure `vet` to
onboard and authenticate with SafeDep Cloud.

:::info
`vet` introduces `--report-sync` flag to sync data to SafeDep Cloud.

:::

Run `vet` with `--report-sync` flag to sync data to SafeDep Cloud.

```shell
vet scan -M /path/to/package-lock.json --report-sync \
  --report-sync-project my-project \
  --report-sync-project-version my-project-version
```

- `--report-sync-project` is the project name (e.g. your repository name)
- `--report-sync-project-version` is the project version (e.g. branch or tag)

## Using `vet-action` GitHub Action

If you are using [vet-action](https://github.com/safedep/vet-action) with GitHub,
you can configure it to send issues and policy violations to SafeDep Cloud.
Enable this integration by setting following parameters in your GitHub workflow:

```yaml
[...]
  cloud: true
  cloud-key: ${{ secrets.SAFEDEP_CLOUD_API_KEY }}
  cloud-tenant: ${{ secrets.SAFEDEP_CLOUD_TENANT_DOMAIN }}
[...]
```

