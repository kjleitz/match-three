# ts-sandbox-2

## about

This is a sandbox "template" repo, mostly for my own convenience (but feel free to use it). I use it to play around with TypeScript when I need a minimal local environment to test things out.

Already set up:

- `webpack`
- `webpack-dev-server`
- `typescript`
- `eslint`
- `@typescript-eslint`

## setup

```bash
git clone https://github.com/kjleitz/ts-sandbox-2
cd ts-sandbox
yarn install # or npm install
```

- create TypeScript files in in `src/`
- consider `src/index.ts` your entry point
- run `yarn build` if you want to build (output is in `dist/`)
- run `yarn start` and navigate to `localhost:8080` to serve w/ `webpack-dev-server`
- use es2015 imports

## license

MIT

## contributing

sure, yeah, pull requests welcome
