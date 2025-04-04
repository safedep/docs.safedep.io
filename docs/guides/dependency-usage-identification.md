---
draft: false
title: ✅ Dependency Usage Identification through Code Analysis
sidebar_position: 4
---

# Dependency Usage Identification through Code Analysis

`vet` can identify dependency usage in your code using static code analysis.
It is useful when dealing with vulnerabilities so that you can
prioritise only those dependencies you've actually used in your code.

### Demo

<iframe width="700" height="400" src="https://www.youtube.com/embed/yFUuMMAsnfI?si=hqL3SIIMjlN_kNpr" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

### Usage

Create a code analysis database with code context
including dependency usage evidences (enabled by default) for source code in `src/`

```bash
vet code scan --app src --db /tmp/dump/vet-test.db
```

Perform vet scan, enriched with dependency usage evidence data from code analysis database generated above.

```bash
vet scan --code /tmp/dump/vet-test.db
```

## Reference

- https://github.com/safedep/vet
