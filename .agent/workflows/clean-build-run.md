---
description: Perform a clean build and run of the application, removing cached layers.
---

1. Stop existing containers and remove orphaned containers:
```bash
docker compose down --remove-orphans
```

2. Rebuild the services from scratch without using cache (ensures latest code is used):
// turbo
```bash
docker compose build --no-cache
```

3. Start the services in detached mode:
// turbo
```bash
docker compose up -d
```

4. (Optional) Check the logs to ensure everything started correctly:
```bash
docker compose logs -f
```
