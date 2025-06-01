---
sidebar_position: 11
title: 🐙 DefectDojo Integration
---

# 🐙 DefectDojo Integration

`vet` supports integration with [DefectDojo](https://github.com/DefectDojo/django-DefectDojo) to track and manage vulnerabilities. You can export vulnerabilities, policy violations and other findings to DefectDojo. Each scans are reported as a new engagement in DefectDojo.

## Prerequisites

- Docker
- Docker Compose
- DefectDojo instance
- `vet`

Follow [quickstart](../quickstart.md) to install `vet` if you don't have it yet.

## 🚀 Getting Started

For this example, we will setup DefectDojo instance using Docker Compose. We will scan [demo-client-python](https://github.com/safedep/demo-client-python) repository with `vet` and report findings to DefectDojo.

### 🔧 Setup DefectDojo

* Clone [DefectDojo](https://github.com/DefectDojo/django-DefectDojo) repository.

```bash
git clone https://github.com/DefectDojo/django-DefectDojo.git --depth 1
```

* Switch to the repository directory.

```bash
cd django-DefectDojo
```

* Run `docker compose up -d` to start DefectDojo.

```bash
docker compose up -d
```

:::info
This will take a while to start up because it will build the images and download the dependencies.
:::

* Get the admin password from the logs.

```bash
docker compose logs initializer | grep "Admin password:"
```

:::info
This will take a while as well because the `initializer` container will run the migrations and create the initial data.
:::

* Navigate to `http://localhost:8080` and login with the credentials `admin` and the password you got from the logs.

![DefectDojo Login](/img/defect-dojo-integration/dd-1-login.png)

* Create a new product called `demo-client-python` and note down the product ID

![DefectDojo Add Product](/img/defect-dojo-integration/dd-2-add-product.png)

![DefectDojo Observe Product ID](/img/defect-dojo-integration/dd-3-observe-product-id.png)

* Navigate to `http://localhost:8080/api/key-v2` to get the API key.
  
* Set the API key as environment variable for use by `vet`

```bash
export DEFECT_DOJO_APIV2_KEY=<your-api-key>
```

### 🔥 Scan using `vet`

* Run `vet` with the following command to scan an intentionally vulnerable [demo-client-python](https://github.com/safedep/demo-client-python) repository.

```bash
vet scan --github https://github.com/safedep/demo-client-python \
  --filter-suite /path/to/your/policy-suite.yml \
  --report-defect-dojo \
  --defect-dojo-host-url http://localhost:8080/ \
  --defect-dojo-product-id <your-product-id>
```

- `vet` will create a new engagement in DefectDojo
- `vet` will report the policy violations as new findings in DefectDojo. Learn more about [queries](../advanced/build-your-own-querie.md) and [policy as code](../advanced/policy-as-code.md)


**Note:** `vet` currently reports only policy violations to DefectDojo. Feature enhancement to
report vulnerabilities and malicious package information is planned at [https://github.com/safedep/vet/issues/430](https://github.com/safedep/vet/issues/430).
