---
sidebar_position: 100
title: ❓FAQ
---

# FAQ

## Authentication Error

### User Not Found

```
ERRO[0001] Failed to execute whoami: rpc error: code = Unauthenticated desc = unauthenticated: Token auth failed: No user: record not found 
```

The user is not registered. Follow [quickstart](quickstart) to register with SafeDep cloud.

### Tenant Not Found

```
ERRO[0001] Failed to execute query: rpc error: code = Unknown desc = failed to resolve tenant: record not found 
```

The tenant is not configured in `vet`. Configure using `vet auth configure --tenant <tenant-domain>` or `vet cloud login --tenant <tenant-domain>`. If you have forgotten the tenant domain, you can do `vet cloud login` followed by `vet cloud whoami` to find your tenants.