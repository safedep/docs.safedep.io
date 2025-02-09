---
sidebar_position: 4
title: ❗ Exceptions
---

# ❗ Vet - Exceptions Management

Any security scanning tool may produce

1. False positive
2. Issues that are acceptable for a period of time
3. Issues that are ignored permanently

`vet` supports adding one or more packages to an exceptions list. These
packages are excluded from the scan results and will not be reported.

:::warning

Package exceptions must be handled with care. Any package added to the
exceptions list will not be scanned and reported, including any future issues
that may arise in the package. To mitigate this risk, we will ensure that
issues can be ignored till an acceptable time window and not permanently.

:::

## Generating Exceptions List

### Manual

- Create a new file `exceptions.yml` with the following content

```yaml
description: Exceptions File for vet
exceptions:
- ecosystem: npm
  expires: "2025-05-10T00:00:00Z"
  id: 01JKMC07KAGJYEDZX1XPAC3SKP
  name: '@babel/plugin-transform-function-name'
  version: 7.18.9
- ecosystem: npm
  expires: "2025-05-10T00:00:00Z"
  id: 01JKMC07KASSGYH1PHQY09QNZ3
  name: '@babel/plugin-proposal-object-rest-spread'
  version: 7.12.1
```

> **Note:** The `expires` field is mandatory and should be in RFC3339 format.
> The `id` field must be unique and can be in any unique string format.

### Using `vet` to Generate Exceptions

- Run a scan against your code base and dump raw data to a temporary directory

```bash
vet scan -D /path/to/repo --json-dump-dir /path/to/dump
```

- Use `vet query` to generate exceptions for all packages without a critical or high severity issue

```bash
vet query --from /path/to/dump \
    --exceptions-generate /path/to/exceptions.yml \
    --exceptions-filter '!vulns.critical.exists(p, true) && !vulns.high.exists(p, true)' \
    --exceptions-till '2025-05-01'
```

- Alternatively, use `vet query` to generate exceptions for all existing packages

:::warning

Adding all packages to exceptions is not recommended. It is better to add exceptions for specific packages based on use-case specific requirements.

:::

```bash
vet query --from /path/to/dump \
    --exceptions-generat e /path/to/exceptions.yml \
    --exceptions-filter 'true' \    # Optional filter for packages to add
    --exceptions-till '2023-12-12'
```

:::info

`--exceptions-till` is parsed as `YYYY-mm-dd` and will generate a timestamp of `00:00:00` in UTC timezone for the date in RFC3339 format

:::

## Using Exceptions

### Exceptions with `vet-action`

[vet-action](https://github.com/safedep/vet-action) supports custom exceptions
configuration. To add exceptions to the workflow

1. Create `.github/vet/exceptions.yml` in your repository with your exceptions configuration
2. Update your `vet-ci.yml` workflow to include the exceptions file

```yaml
- name: Vet Scan
  uses: safedep/vet-action@v1
  with:
    exception-file: .github/vet/exceptions.yml
```

For more information, refer to [vet-action documentation](https://github.com/safedep/vet-action?tab=readme-ov-file#configuration)

### Exceptions with `vet`

An exceptions file can be passed as a global flag to `vet`. It will be used for various commands such as `scan` or `query`.

```bash
./vet --exceptions /path/to/exceptions.yml scan -D /path/to/repo
```

:::caution

Do not pass this flag while generating exceptions list in query workflow to avoid incorrect exception list generation

:::

## Behavior

- All exceptions rules are applied only on a `Package`
- All comparisons will be case-insensitive except version
- Only `version` can have a value of `*` matching any version
- Exceptions are globally managed and will be shared across packages
- Exempted packages will be ignored by all analysers and reporters
- First match policy for exceptions matching

Anti-patterns that will NOT be implemented

- Exceptions will not be implemented for manifests because they will cause false negatives
- Exceptions will not be created without an expiry to avoid future false negatives on the package
