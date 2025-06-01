---
draft: false
title: 🌀 CycloneDX SBOM generation
sidebar_position: 7
---

# CycloneDX SBOM generation using vet

`vet` supports [CycloneDx v1.6](https://cyclonedx.org/docs/1.6/json) SBOM generation. The generated SBOM provides a comprehensive inventory of all packages and their dependencies in the project. It includes security metadata like detected vulnerabilities, malware and license information of dependencies

### Usage

Perform vet scan with cdx report enabled. You may provide a custom application name used as root component of the SBOM

```bash
vet scan --report-cdx path/to/report.cdx.json \
         --report-cdx-app-name myproject # Optional
```

## Sample SBOMs

- [chat-server.cdx.json](/downloads/chat-server.cdx.json)
- [express.cdx.json](/downloads/express.cdx.json)

## Reference

- https://github.com/safedep/vet
- https://cyclonedx.org/docs/1.6/json/
