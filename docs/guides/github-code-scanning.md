---
sidebar_position: 1
title: 🧪 GitHub Code Scanning
---

# GitHub Code Scanning Integration

GitHub supports [uploading SARIF](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)
reports to enable repository and organization-wide visibility of security
events across different tools. `vet` supports exporting policy violation
reports as [SARIF](#) which can be uploaded to GitHub.

## Using SARIF Reports

To generate a SARIF report, use the `vet` command with the `--report-sarif` flag:

```shell
vet scan -D /path/to/project --report-sarif /path/to/report.sarif
```

## GitHub Action

`vet` has a GitHub Action for easy integration. Refer to [vet GitHub
Action](https://github.com/safedep/vet-action) for more details. The action
produces a SARIF report which can be uploaded to GitHub.

Invoke `vet-action` to run `vet` in GitHub

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
  
jobs:
  vet-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run vet
        id: vet
        uses: safedep/vet-action@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Upload the SARIF report to GitHub

:::info

SARIF reports work when you enable GitHub Code Scanning in your repository.
[Learn more](https://docs.github.com/en/code-security/code-scanning/enabling-code-scanning)

:::

```yaml
- name: Upload SARIF
  if: steps.vet.outputs.report != ''
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: ${{ steps.vet.outputs.report }}
    category: vet
```

[Full Example](https://github.com/safedep/vet-action/blob/main/example/vet-ci.yml)

**Note:** `vet` will only include policy violations in the SARIF report.
A policy must be provided to `vet` using `--filter` or `--filter-suite` flag
during scan. This is automatically included if you are using `vet-action`.

## GitHub Code Scanning Alerts

Once the SARIF report is uploaded to GitHub, policy violations will be
available in the GitHub Security tab. This provides a centralized view of
policy violations across different repositories.

![GitHub Code Scanning Alerts](/img/vet-github-code-scanning-alerts.png)
