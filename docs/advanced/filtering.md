---
sidebar_position: 1
title: 🔎 Filtering
---

# 🔎 Filtering

Filter command helps solve the problem of visibility for OSS dependencies in an application. To support various requirements, we adopt a generic [expressions language](https://cel.dev/) for flexible filtering.

```mermaid
graph TD
    subgraph "Input Sources"
        A[Package Info] -->|ecosystem, name, version| D[Filter Expression]
        B[Vulnerabilities] -->|critical, high, medium, low| D
        C[OpenSSF Scorecard] -->|scores| D
        E[Project Info] -->|stars, forks, issues| D
        F[Licenses] -->|SPDX codes| D
    end

    subgraph "Filter Evaluation"
        D -->|CEL Expression| G{Boolean Result}
        G -->|true| H[Include in Results]
        G -->|false| I[Exclude from Results]
    end

    %% Theme-aware styling
    style A fill:transparent,stroke:#228be6,stroke-width:2px
    style B fill:transparent,stroke:#228be6,stroke-width:2px
    style C fill:transparent,stroke:#228be6,stroke-width:2px
    style D fill:transparent,stroke:#228be6,stroke-width:2px
    style E fill:transparent,stroke:#228be6,stroke-width:2px
    style F fill:transparent,stroke:#228be6,stroke-width:2px
    style G fill:transparent,stroke:#228be6,stroke-width:2px
    style H fill:transparent,stroke:#40c057,stroke-width:2px
    style I fill:transparent,stroke:#fa5252,stroke-width:2px

    %% Subgraph styling
    classDef subgraphStyle fill:transparent,stroke:#adb5bd,stroke-width:1px
    class "Input Sources","Filter Evaluation" subgraphStyle

## Example

- The scan will list only packages that use the `MIT` license.

```bash
vet scan -D /path/to/repo \
    --report-summary=false \
    --filter 'licenses.exists(p, p == "MIT")'
```

- Find dependencies that seems not very popular

```bash
vet scan --lockfiles /path/to/pom.xml --report-summary=false \
    --filter='projects.exists(x, x.stars < 10)'
```

- Find dependencies with a critical vulnerability

```bash
vet scan --lockfiles /path/to/pom.xml --report-summary=false \
    --filter='vulns.critical.exists_one(x, true)'
```

## Input

Filter expressions work on packages (aka. dependencies) and evaluates to a boolean result. The package is included in the results table if the expression evaluates to `true`.

- Filter expressions get the following input data to work with

| Variable    | Content                                                     |
| ----------- | ----------------------------------------------------------- |
| `_`         | The root variable, holding other variables                  |
| `vulns`     | Holds a map of vulnerabilities by severity                  |
| `scorecard` | Holds OpenSSF scorecard                                     |
| `projects`  | Holds a list of source projects associated with the package |
| `licenses`  | Holds a list of licenses in SPDX license code format        |

:::tip

Refer to [filter input spec](https://github.com/safedep/vet/blob/main/api/filter_input_spec.proto) for detailed structure of input messages.

:::

## Expressions

Expressions are [CEL](https://github.com/google/cel-spec) statements. While
CEL internals are not required, an [introductory](https://github.com/google/cel-spec/blob/master/doc/intro.md)
knowledge of CEL will help formulating queries. Expressions are logical
statements that evaluate to `true` or `false`.

### Example Queries

| Description                                  | Query                                |
| -------------------------------------------- | ------------------------------------ |
| Find packages with a critical vulnerability  | `vulns.critical.exists(x, true)`     |
| Find unmaintained packages as per OpenSSF SC | `scorecard.scores.Maintained == 0`   |
| Find packages with low stars                 | `projects.exists(x, x.stars < 10)`   |
| Find packages with GPL-2.0 license           | `licenses.exists(x, x == "GPL-2.0")` |

:::tip

Refer to [scorecard checks](https://github.com/ossf/scorecard#checks-1) for a list of checks available from OpenSSF Scorecards project.

:::

## How does the filter input JSON look like?

```json
{
  "pkg": {
    "ecosystem": "npm",
    "name": "lodash.camelcase",
    "version": "4.3.0"
  },
  "vulns": {
    "all": [],
    "critical": [],
    "high": [],
    "medium": [],
    "low": []
  },
  "scorecard": {
    "scores": {
      "Binary-Artifacts": 10,
      "Branch-Protection": 0,
      "CII-Best-Practices": 0,
      "Code-Review": 8,
      "Dangerous-Workflow": 10,
      "Dependency-Update-Tool": 0,
      "Fuzzing": 0,
      "License": 10,
      "Maintained": 0,
      "Packaging": -1,
      "Pinned-Dependencies": 9,
      "SAST": 0,
      "Security-Policy": 10,
      "Signed-Releases": -1,
      "Token-Permissions": 0,
      "Vulnerabilities": 10
    }
  },
  "projects": [
    {
      "name": "lodash/lodash",
      "type": "GITHUB",
      "stars": 55518,
      "forks": 6787,
      "issues": 464
    }
  ],
  "licenses": ["MIT"]
}
```
