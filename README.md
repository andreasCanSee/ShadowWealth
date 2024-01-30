# Hinweise für die Entwicklung

Zuerst mit `npm install` alle Dependencies installieren.

Für TailwindCSS anhand der Basisdirektiven dynamisch eine output.css generieren (im static - Ordner), die dann von app.html eingebunden wird

`npx tailwindcss -i ./src/input.css -o ./static/output.css --watch`

Den Entwicklungsserver starten:

``npm run dev -- --open


Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
