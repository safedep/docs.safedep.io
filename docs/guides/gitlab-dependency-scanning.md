---
sidebar_position: 2
title:  🛡️ GitLab Dependency Scanning
---

`vet` supports native GitLab Dependency Scanning. You can use `vet` to protect your project from malicious and vulnerable dependencies on every push and merge request to GitLab.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3FwcVVR9-1c?si=EyqimClJRLCFftnB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prerequisites

- GitLab Account
- GitLab Group with Ultimate Plan

:::info

Any kind of security scanning is only available to GitLab Ultimate plans.

:::

## Configure GitLab Dependency Scanning

To enable `vet` dependency scanning in your GitLab project, you need to:

### 1. Enable `CI` on your project.

To do this, create a `.gitlab-ci.yml` file in the root of your project.

```bash
touch .gitlab-ci.yml
```

### 2. Add `vet` as a `CI Component` in your ci pipeline.

To do this, add the following to your `.gitlab-ci.yml` file:

```yaml
include:
  - component: gitlab.com/safedep/ci-components/vet/scan@v1.4.0
```

Now commit and push changes to your project to trigger the first scan.

**This is it! 🚀, congrulation you have enabled `vet` dependency scanning in your GitLab project.**

You will see the `vet` job in your pipeline, with a `security` tab.

![GitLab Dependency Scanning Pipeline view](/img/gitlab/pipeline.png)

You can find all the vulnerabilities and malware found by `vet` in the `security` tab.

![GitLab Dependency Scanning Security tab](/img/gitlab/vuls.png)

You can also view these details on the `Project > Secure > Vulnerabilitiy Report` page.

![GitLab Dependency Scanning Vulnerability Report](/img/gitlab/dashboard.png)

## Inputs & Configuration

This CI Component supports many inputs and configuration options.

All inputs & configuration options are available in the [`vet`'s GitLab Component Catalog](https://gitlab.com/explore/catalog/safedep/ci-components/vet).

### Cloud Sync

To enable [cloud sync](https://docs.safedep.io/cloud/quickstart#vet-with-safedep-cloud) you need to set the following input:

```yml
include:
  - component: gitlab.com/safedep/ci-components/vet/scan@v1.4.0
    inputs:
      cloud: true
      cloud-key: $CLOUD_KEY
      cloud-tenant: $CLOUD_TENANT
```

:::warning

Make sure to put the `CLOUD_KEY` and `CLOUD_TENANT` in the GitLab CI/CD variables.

:::

This will sync the scan results to [SafeDep Cloud](https://docs.safedep.io/cloud).

## Other Inputs

### Version

Specify which version of `vet` to use.

```yaml
include:
  - component: gitlab.com/safedep/ci-components/vet/scan@v1.4.0
    inputs:
      version: v1.9.0
```

### Trusted Registries

Trusted registry URLs to use for package manifest verification.

```yaml
include:
  - component: gitlab.com/safedep/ci-components/vet/scan@v1.4.0
    inputs:
      trusted-registries:
        - https://url.com
        - https://url2.com
```

### Artifacts Access Configuration

Artifact access to determine who can access the job artifacts from the GitLab UI or API. It can be set to `all`, `developer`, or `none`.

```yaml
include:
  - component: gitlab.com/safedep/ci-components/vet/scan@v1.4.0
    inputs:
      artifact-access: 'developer'
```

:::warning

Only use `all` if you are ok with exposing the security scan results to pulic.

:::

### Issue Reporting

If you find any issue with `vet` GitLab Component, please report it to us on [Repository](https://gitlab.com/safedep/ci-components/vet/-/issues).
