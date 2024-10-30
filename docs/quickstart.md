---
sidebar_position: 3
title: 🚀 Quick Start
---

# 🚀 Quick Start

:::info
For SafeDep Cloud, refer to [Cloud Quickstart](cloud/quickstart.md)
:::

Get started with `vet` for identifying risky open source components used in your application. Establish policy driven guardrails to prevent introducing risky open source components in your application.

## Installation

### Use `homebrew`

```shell
brew tap safedep/tap
brew install safedep/tap/vet
```

### Use Container Image

```shell
docker run --rm -it ghcr.io/safedep/vet:latest version
```

### Binary

Download a pre-built binary suitable for your OS at [GitHub Releases](https://github.com/safedep/vet/releases)

### Other

For a list of supported installation options, refer to [vet's README](https://github.com/safedep/vet)

## Running a Scan

Scan a directory, auto-discovering well known manifest files

```shell
vet scan -D /path/to/dir
```

## Policy as Code

`vet` supports [CEL](https://cel.dev/) based policy language for identifying risks. Scan and fail on critical or high risk vulnerabilities

```shell
vet scan -D /path/to/dir \
  --filter '(vulns.critical.size() > 0) || (vulns.high.size() > 0)' \
  --filter-fail
```

Multiple CEL queries can be combined to create a policy. [See example](https://github.com/safedep/vet/blob/main/samples/filter-suites/fs-generic.yml). Audit your application using your opinionated policy as code

```shell
vet scan -D /path/to/dir \
  --filter-suite /path/to/policy.yml \
  --filter-fail
```

## Setup Guardrails in CI/CD

`vet` supports a native [GitHub Action](https://github.com/safedep/vet-action) that can be used to easily setup a policy driven guardrail against risky OSS components. Refer to [vet-action](https://github.com/safedep/vet-action) on setting up pull request integration for GitHub.

![](/img/vet-guardrails.png)

## Whats Next?

Refer to [vet GitHub Repository](https://github.com/safedep/vet) for latest documentation on usage.
