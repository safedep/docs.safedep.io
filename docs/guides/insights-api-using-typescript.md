---
sidebar_position: 5
title: ☁️ Programmatic Access to Insights API
---

:::info
To follow this guide you need a SafeDep Cloud API Key and Tenant Identifier.
See [Cloud Quickstart](../cloud/quickstart.md) on how to onboard to SafeDep Cloud and get an API key.
:::

In this guide, we will use Typescript to build a client application that leverages SafeDep Insights API v2 to identify open source package security metadata. Any programming language [supported by our API SDK](https://buf.build/safedep/api/sdks) can be used to achieve the same.

Start by creating a Typescript project in your project directory

```shell
npm init
npm i --save-dev typescript @types/node
```

Configure `npm` to use [Buf Registry](https://buf.build/docs/bsr/generated-sdks/npm/).

```shell
npm config set @buf:registry https://buf.build/gen/npm/v1/
```

Install SafeDep API SDKs

```shell
npm install --save @buf/safedep_api.connectrpc_es@latest
```

Set the tenant identifier and API key in the environment

```shell
export SAFEDEP_API_KEY=your-api-key
export SAFEDEP_TENANT_ID=your-tenant-id
```

Lets get the imports in place using which we will create a `ConnectRPC` client and use it to call Insights Service.

```typescript
import { createPromiseClient, Interceptor, UnaryRequest } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
```

Define an interceptor that adds the tenant information and API key into each RPC call

```typescript
function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  }
}
```

We are now good to write our `main` function that creates the client, service and executes an RPC call to get package security metadata.

```typescript
async function main() {
  const token = process.env.SAFEDEP_API_KEY;
  if (!token) {
    console.error("SAFEDEP_API_KEY is required")
    process.exit(1)
  }

  const tenantId = process.env.SAFEDEP_TENANT_ID;
  if (!tenantId) {
    console.error("SAFEDEP_TENANT_ID is required")
    process.exit(1)
  }

  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenantId)]
  });

  const client = createPromiseClient(InsightService, transport);
  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: {
        ecosystem: Ecosystem.NPM,
        name: "lodash",
      },
      version: "4.17.21",
    }
  })

  console.log(res.toJson())
}
```

For more information on request and response schema, see [Insights v2 API Specification](https://buf.build/safedep/api/docs/main:safedep.services.insights.v2#safedep.services.insights.v2.GetPackageVersionInsightRequest)