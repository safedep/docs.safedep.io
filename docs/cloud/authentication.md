---
sidebar_position: 3
title: 🔒 Authentication
draft: false
---

SafeDep Cloud API has two plane of operations

- Control Plane
- Data Plane

APIs that expose configuration, reporting, management aka. control related operations are exposed through the Control Plane of the platform. While APIs that expose *data* operations such as fetching package insights metadata or synchronizing `vet` reports with SafeDep Cloud are part of the Data Plane of the platform.

:::info
All APIs for security tools integration are part of the Data Plane. 
These APIs require an API key for authentication and may enforce rate limits under a fair usage policy.
:::

| Plane         | API Endpoint       | Supported Authentication |
| ------------- | ------------------ | ------------------------ |
| Data Plane    | `api.safedep.io`   | JWT and API Key          |
| Control Plane | `cloud.safedep.io` | JWT                      |

## JWT Authentication

To authenticate with Control Plane that requires JWT authentication, you need to obtain a JWT token. Our identity service is hosted at `https://auth.safedep.io` and is an OAuth2 / OIDC compatible identity provider. The OpenID configuration endpoint is available at `https://auth.safedep.io/.well-known/openid-configuration`. 

### Command Line Token Authentication

OAuth2 [Device Code](https://auth0.com/docs/get-started/authentication-and-authorization-flow/device-authorization-flow) flow can be used to authenticate command line tools with SafeDep Cloud Identity Service to obtain a JWT. Refer to [vet OAuth2 Client Implementation](https://github.com/safedep/vet/blob/main/cmd/cloud/login.go) for example.