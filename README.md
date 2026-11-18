# DA FØLD website

The website for dafold.com, built with SvelteKit and served by Cloudflare Workers.

- Design brief: `PRODUCT.md`. Design system: `DESIGN.md`. Tokens: `brand/tokens.css`.
- The contact form posts to `/api/send-message` (`src/routes/api/send-message/+server.ts`), which sends mail through EmailJS.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # type-check
npm run preview    # build, then run in the Workers runtime (wrangler dev)
```

## Deploy

Cloudflare Workers Builds is connected to this repository. A push to `main` deploys to production (dafold.com). Pushes to other branches build preview versions.
