---
sidebar_position: 3
title: 🚀 Quick Start
---

# 🚀 Quick Start

> For `SafeDep Cloud Quickstart`, refer to [Cloud Quickstart](cloud/quickstart.md)

> For latest guidance on getting started with `vet`, refer to [official README in GitHub Repository](https://github.com/safedep/vet)

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

