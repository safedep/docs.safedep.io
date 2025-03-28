---
sidebar_position: 3
title: 🏄 Code Analysis
---

# Code Analysis

:::note

EXPERIMENTAL: This feature is experimental and may introduce breaking changes.

:::

`vet` uses [code](https://github.com/safedep/code/) analysis framework built on top of [tree-sitter](https://tree-sitter.github.io/tree-sitter/) parsers.
The goal of this framework is to support multiple languages, source repositories (local and remote), and report the findings.

`vet` uses these findings and creates a Code analysis database, which can be used for enriching / analysing manifests during scanning.


## Build a Code Analysis Database

Analyses code and builds a SQLite database for further analysis. This is a pre-requisite to enable code analysis features in `vet scan`

```bash
vet code scan --app /path/to/app \
    --db /tmp/code.db \
    --lang python
```

The above command does the following:

- Utilise [code](https://github.com/safedep/code/) to analyse application python code recursively in `/path/to/app`

    Note: `--lang` can be omitted to enable analysis of all langauages

- Creates a SQLite database at `/tmp/code.db` with reported findings

## Scan with dependency usage analysis findings

To enable code analysis features in `vet scan`, the Code analysis database path must be provided using the `--code` flag.

Dependency usage analysis, being a fundamental feature is enabled by default.

```bash
vet scan -D /path/to/code --code /tmp/code.db
```

The above command does the following:

- Analyses manifests in `/path/to/code`
- Uses Code Analysis database at `/tmp/code.db` for enriching packages with the dependency usage data
- Show summary of the scan with usage evidences & `used-in-code` tags proving actual usage of a library

![vet scan with code DB](/img/vet/vet-scan-codedb.png)

