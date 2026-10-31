import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// News is compiled from MDX at build time and refreshed on each deployment.
export default defineCloudflareConfig({incrementalCache: staticAssetsIncrementalCache});
