# v-clappr demo

Live at https://v-clappr.vinayakkulkarni.dev — a Vite + Vue 3 app that exercises the
`v-clappr` package from this workspace. It deploys as static assets on the
`v-clappr-demo` Cloudflare Worker.

```bash
pnpm install
pnpm --filter ./example dev       # local dev server
pnpm run build:demo               # build the package, then the demo
pnpm run deploy                   # build and `wrangler deploy`
```
