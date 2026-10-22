# Tim Kattenbusch — Portfolio

Statische Portfolio-Website für Tim Kattenbusch. Aufbau, Raster und Bewegung orientieren sich an einem reduzierten Designer-Portfolio: große Schrift, zweispaltiges Raster, Buchstaben-Einstieg, Einblendungen beim Scrollen, Kopfzeile beim Hochscrollen, Logo-Laufband. Texte, Name und Bilder sind Tims eigene; die Schrift ist [Geist](https://github.com/vercel/geist-font) (SIL Open Font License) über Fontsource.

Gesamter Inhalt steht in einer Datei: [`src/data/site.js`](src/data/site.js).

## Inhalt bearbeiten

1. `src/data/site.js` öffnen.
2. Texte, Projekte, Navigation, Kontakt oder Impressum ändern.
3. Neue Projektbilder nach `public/images/<slug>/` legen und in `projects` verlinken.
4. Dev-Server neu laden oder neu bauen. Die HTML-Seiten werden aus der Datendatei erzeugt.

Felder, die auf der bisherigen Website nicht standen (Jahr, externer Link, Porträt, Explorationen, Agenturname), sind im Text mit **Platzhalter** markiert.

### Fotografie und Meeresschutz

Beide Bereiche sind vorbereitet und deaktiviert (`enabled: false`). In der Fußzeile stehen sie als „deaktiviert“. Zum Freischalten in `preparedSections` den Eintrag auf `enabled: true` setzen. Danach erscheint der Punkt in der Navigation und die Seite unter `/fotografie` bzw. `/meeresschutz`.

### Projekte

Jedes Projekt in `projects` hat `slug`, `title`, `summary`, `type`, `role`, `year`, `link`, `cover`, `images`, `intro` und `goals`. Absätze mit `placeholder: true` bekommen auf der Seite die Kennzeichnung „Platzhalter“.

`link` ist entweder `null` oder `{ href: "https://…" }`.

## Lokal starten

```bash
npm install
npm run dev
```

Der Dev-Server liefert saubere Pfade (`/ueber-mich`, `/arbeiten/promiflash`). `base` ist `/`, weil die Seite bei Tim an der Domain-Wurzel liegt.

Produktionsbuild:

```bash
npm run build
npm run preview
```

Das Ergebnis liegt in `dist/`.

## Deploy mit Docker

Zweistufiges Image: Node baut `dist`, nginx liefert es auf Port 80.

```bash
docker build -t tim-portfolio .
docker run --rm -p 8080:80 tim-portfolio
```

Auf einem Dokploy-Server das Repo als Dockerfile-App anlegen, Port 80 veröffentlichen und die Domain auf den Container zeigen. Kein Unterpfad nötig.

nginx löst `/ueber-mich` auf `ueber-mich.html` auf.

## Seiten

| Pfad | Inhalt |
| --- | --- |
| `/` | Start |
| `/ueber-mich` | Info und Werdegang |
| `/arbeiten` | Projekte und Explorationen |
| `/arbeiten/<slug>` | Case Study |
| `/impressum` | Angaben gemäß § 5 TMG |
| `/fotografie`, `/meeresschutz` | nur wenn `enabled: true` |
