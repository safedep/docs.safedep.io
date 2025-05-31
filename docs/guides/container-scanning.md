---
sidebar_position: 4
title:  🚚 Container Scanning
---

# Container Scanning

<iframe width="560" height="315" src="https://www.youtube.com/embed/l-cBfp3FDYs?si=-wvHw7Sx9s28yrdb" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

`vet` can scan container images for vulnerabilities and malware. 

These are multiple ways to scan container images with `vet`:

1. Scan a local container image
2. Scan a remote container image
3. Scan image from saved tar file


## Scan a local container image

If you have already download / pulled the image from container registry, you can scan it using the following command:

```bash
vet scan image --image redis:latest
```

if image is not available on the system, then it will be downloaded from the registry.

## Scan a remote container image

You can scan a remote container image by providing the image name and tag.

```bash
vet scan image --image redis:latest
```

This command will download the image from the registry and scan it.

## Scan image from saved tar file

To save an image to a tar file, you can use the following command:

```bash
docker save redis:latest -o redis.tar 
```

You can scan an image from a saved tar file by providing the path to the tar file.

```bash
vet scan image --image /path/to/image.tar
```

This command will scan the image from the tar file.

# Malware Scanning

All other flags in `vet` like `--filter`, `--filter-suite`, `--policy`, `--policy-suite`, `--malware`, `--report-cdx`, etc are applicable to container scanning.

## Scanning for malware

You can scan for malware by using the following command:

```bash
vet scan image --image redis:latest --malware
```

This command will scan the image for malware.


