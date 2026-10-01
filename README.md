# GlanzWerkstatt Frankfurt — Website-Portfolio

Eine responsive Website für Fahrzeugaufbereitung, umgesetzt mit HTML, CSS und JavaScript. Dieses Repository zeigt die Website als ausgewählte Arbeitsprobe von Kenny Winter.

**[Öffentliche Website ansehen](https://glanzwerkstatt-ffm.de/)**

## Was das Projekt zeigt

- Semantisches HTML mit eigener responsiver Gestaltung.
- Ein CSS-Designsystem mit Variablen für Farben, Typografie, Abstände und Bewegung.
- Mobile Navigation mit JavaScript.
- Lokal eingebundene Schriften, optimierte Bildgrößen und WebP-Assets.
- Separate Seiten für Impressum, Datenschutz und Fehlerseite.
- Statische Auslieferung ohne Framework, Paketinstallation oder Build-Schritt.

## Lokal starten

Voraussetzung: Python 3.

```sh
python -m http.server 4321 --bind 127.0.0.1 --directory site
```

Danach http://localhost:4321/ öffnen. Alternativ kann jeder statische Webserver den Ordner `site/` bereitstellen. Auf Windows ist gegebenenfalls `py` statt `python` zu verwenden.

## Orientierung im Code

| Pfad | Aufgabe |
|---|---|
| `site/index.html` | Startseite und Inhalte |
| `site/styles/tokens.css` | Designvariablen und Schriften |
| `site/styles/site.css` | Layout und responsive Darstellung |
| `site/js/site.js` | Navigation und Interaktionen |
| `site/assets/` | Bilder, Markenassets und Schriften |

Die übrigen HTML-Dateien zeigen die rechtlichen Seiten und die Fehlerseite. Der einfache Python-Server leitet unbekannte URLs nicht automatisch auf die projektbezogene `404.html` um; diese kann lokal direkt geöffnet werden.

Die Links zu Impressum und Datenschutz verwenden in dieser Kopie ausdrücklich `.html`, damit sie auch auf einem einfachen lokalen Webserver funktionieren.

## Einordnung

Dies ist eine eigenständige Portfolio-Kopie mit neuer Historie. Sie enthält den freigegebenen öffentlichen Website-Ordner. Der Produktivbetrieb wird separat verwaltet. Kontaktdaten wurden durch Demo-Platzhalter ersetzt. Die rechtlichen Unterseiten zeigen ausschließlich einen Demo-Hinweis und sind keine Vorlage für den produktiven Einsatz.

Die Erstellung erfolgte mit KI-Unterstützung. Auf der Website als „Symbolbild“ bezeichnete Darstellungen sind keine Nachweise abgeschlossener Kundenarbeiten.

## Nutzung der Inhalte

Code und Assets werden mit Erlaubnis als Arbeitsprobe gezeigt. Es wird keine pauschale Open-Source-Lizenz für die Weiterverwendung von Code, Bildern, Logos oder Kundentexten erteilt. Für eine andere Nutzung bitte die jeweiligen Rechteinhaber kontaktieren.

Die mitgelieferten Schriftdateien Archivo, Inter und IBM Plex Mono stehen unter der SIL Open Font License. Die jeweiligen Copyright- und Lizenztexte liegen unter [`site/assets/fonts/licenses/`](site/assets/fonts/licenses/).

**Demo-Daten:** In dieser Arbeitsprobe sind echte Ansprechpartner, Anschriften und E-Mail-Empfänger entfernt. `demo@example.invalid` ist keine erreichbare Adresse. Die produktive Website ist oben separat verlinkt.
