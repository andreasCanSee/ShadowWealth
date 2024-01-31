# ShadowWealth 🔦

Das Tool **ShadowWealth** bitet dir eine faszinierende Perspektive auf deine Ausgaben und potenzielle Investitionen. Es ist ist darauf ausgerichtet, dir zu zeigen, wie sich dein Geld entwickeln könnte, wenn es statt für Konsumausgaben in ein fiktives Depot investiert worden wäre. 💸

## Überblick
In unserer heutigen Konsumgesellschaft ist es leicht, den Überblick über unsere Ausgaben zu verlieren. **ShadowWealth** hilft dir, bewusster zu konsumieren, indem es dir eine direkte visuelle Rückmeldung über die langfristigen Auswirkungen deiner Kaufentscheidungen gibt. Durch die Eingabe deiner tatsächlichen Ausgaben in unser Tool kannst du in Echtzeit sehen, wie sich diese Beträge als Investitionen in verschiedenen Anlageklassen entwickelt hätten.

### Funktionen
- **Manuelle Eingabe von Ausgaben:** Nutzer können ihre kürzlichen Käufe manuell eintragen und angeben, wie viel Geld sie ausgegeben haben.
- **Investitionssimulation**: Das Tool simuliert, wie sich die eingegebenen Ausgabenbeträge über die Zeit hinweg entwickelt hätten, wäre das Geld stattdessen in ein breit gestreutes Portfolio investiert worden.
- **Dashboard-Ansicht**: Ein intuitives Dashboard bietet einen Überblick über das fiktive Depot und dessen Performance im Vergleich zu den realen Ausgaben.

### Technologie
**ShadowWealth** ist mit modernsten Webtechnologien entwickelt, darunter:

- **[SvelteKit](https://kit.svelte.dev/docs/introduction) und [TypeScript](https://www.typescriptlang.org/)**: Für eine reaktive Benutzeroberfläche, nahtlose Nutzererfahrung und verbesserte Codezuverlässigkeit durch statische Typisierung.
- **[Tailwind CSS](https://tailwindcss.com/docs/installation)**: Für ein elegantes und responsives Design.
- **[Chart.js](https://www.chartjs.org/)**: Zur Erstellung einfacher, schöner und interaktiver Diagramme für das Dashboard.

## Lokale Einrichtung
Um **ShadowWealth** lokal auszuführen, stelle zunächst sicher, dass `Node.js` (mit `npm`) auf deinem System installiert ist. Folge dann diesen Schritten:

1. Klone das Repository:
    ```
    git clone https://github.com/andreasCanSee/ShadowWealth.git
    ```
2. Installiere die Abhängigkeiten
    ``` 
    cd ShadowWealth
    npm install
    ```
3. Starte die Entwicklungsumgebung:
    ```
    npm run dev
    ```


### Hinweise für die Entwicklung


Für `TailwindCSS` anhand der Basisdirektiven dynamisch die _output.css_ generieren (im _static_ - Ordner), die dann von _app.html_ eingebunden wird:

```npx tailwindcss -i ./src/input.css -o ./static/output.css --watch```

Den Entwicklungsserver starten:

`npm run dev -- --open`

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
