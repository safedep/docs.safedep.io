---
draft: false
title: ✅ Dependency Usage Identification through Code Analysis
sidebar_position: 3
---

# Dependency Usage Identification through Code Analysis

`vet` can identify dependency usage in your code with the help of code analysis framework. It is useful when dealing with vulnerabilities so that you can prioritise only those dependencies you've actually used in your code.

Quick demo -

<iframe width="700" height="400" src="https://www.youtube.com/embed/yFUuMMAsnfI?si=hqL3SIIMjlN_kNpr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Commands used in demo -

Create a Code analysis database at `/tmp/dump/vet-test.db` with findings, including dependency usage evidences (enabled by default) for source code in `src/`
```bash
vet code scan --app src --db /tmp/dump/vet-test.db
```

Perform vet scan, enriched with dependency usage evidence data from code analysis database generated above.
```bash
vet scan --code /tmp/dump/vet-test.db
```