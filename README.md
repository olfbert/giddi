# Giddi’s Kitchen Husch

Isometrisches 3D-Kochspiel für iPhone-Safari und Desktop-Browser. Gäste bestellen an vier Ausgaben,
du holst Zutaten, schneidest, brätst, kochst und backst, richtest auf Tellern an und servierst
dem richtigen Gast – unter Zeitdruck. Mit Leveln, Sternen, Münzen, Rezept- und Upgrade-Shop,
Tutorial und dauerhaftem Spielstand (IndexedDB). Läuft komplett statisch, ohne Server und ohne Anmeldung.

Version: 0.1.3 · Engine: three.js r169 (lokal eingebunden)

## Starten

Das Spiel muss über einen Webserver geöffnet werden (nicht per Doppelklick als Datei), weil die
3D-Modelle per `fetch` geladen werden.

**Lokal testen**

```bash
cd kr-spiel
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

**GitHub Pages**

1. Den kompletten Ordnerinhalt (index.html, sw.js, manifest.webmanifest, lib/, assets/, icons/) in ein Repository legen.
2. Repository → Settings → Pages → Branch `main`, Ordner `/ (root)` → Speichern.
3. Nach ein bis zwei Minuten unter `https://<name>.github.io/<repo>/` spielen.

Alle Pfade sind relativ, das Spiel funktioniert also auch in einem Unterordner.

**Auf dem iPhone als App**

Seite in Safari öffnen → Teilen-Symbol → „Zum Home-Bildschirm“. Dann startet das Spiel im Vollbild
ohne Browserleiste und funktioniert nach dem ersten vollständigen Laden auch offline (Service Worker).

## Steuerung

| | Handy | Computer |
|---|---|---|
| Laufen | Daumen auf die linke Bildschirmhälfte legen und ziehen (Joystick erscheint dort) | WASD oder Pfeiltasten |
| Aktion | runde Taste rechts unten – Beschriftung zeigt die aktuelle Aktion | E, Leertaste oder Enter |
| Pause | Pause-Knopf oben rechts | Esc oder P |

Graue Aktionstaste = geht gerade nicht; Tippen zeigt den Grund. Linkshänder-Modus in den Optionen tauscht die Seiten.

## Spielablauf

- Gäste kommen von rechts unten und stellen sich an die Ausgaben 1–4. Die Bestellkarten oben zeigen Gericht,
  Bestandteile (mit Station-Symbol), Geduldsbalken und Status: **neu**, **in Arbeit**, **fertig ✓**.
- Zutaten aus Kisten und dem Kühlschrank holen → Schneidebrett (Taste antippen, stehen bleiben) → Pfanne / Kochtopf / Ofen
  (garen automatisch, verbrennen nach einer Weile) → auf einen Teller vom Tellerstapel → an der Ausgabe des Gastes servieren.
- Der Kühlschrank liefert Rind- und Gemüse-Patty: mit einem Patty in der Hand erneut die Aktionstaste drücken tauscht die Sorte.
- Ein falscher Teller wird nicht angenommen („Das ist für Gast 2!“). Verbranntes kommt in den Mülleimer.
- Belohnung je Gericht: Preis + Trinkgeld (je schneller, desto mehr). Punkte entscheiden über die Sterne;
  ab 1 Stern ist das Level geschafft und das nächste wird frei. Abgelaufene Geduld und Verbranntes kosten Punkte.
- Münzen gibst du im Shop aus: neue Rezepte (teils ab einem Spielerlevel) und Upgrades.
- Die Küche wächst mit: Stationen (Kochtopf, Ofen, weitere Kisten) erscheinen erst,
  wenn ein gekauftes Rezept sie braucht – vorher sind dort Arbeitsflächen.

## Inhalte

**Rezepte (8)** – Frischer Salat, Klassik-Burger (Start), Ofen-Pommes, Zwiebelringe, Deluxe-Burger, Veggie-Burger,
Rinder-Eintopf (Kochtopf), Keulen-Menü (Ofen + Kartoffelpüree aus dem Topf).

**Upgrades (6)** – Flinke Schuhe (Tempo), Scharfes Messer (Schneiden), Turbo-Herd (Garzeiten),
Gemütliche Theke (Geduld), Charme-Kurs (Trinkgeld), Antihaft-Pfannen (später verbrannt). Jeweils 3–4 Stufen;
der Shop zeigt den Wert vorher → nachher.

**Level (8 + Tutorial)** – steigende Gästezahl, mehr gleichzeitige Gäste, kürzere Geduld, komplexere Rezepte.

## Projektstruktur

```
index.html              Spiel (HTML, CSS, JavaScript in einer Datei)
manifest.webmanifest    App-Name, Icons, Vollbild, Querformat
sw.js                   Service Worker (Offline-Cache aller Spieldateien)
lib/three/              three.js r169 + GLTFLoader + SkeletonUtils (lokal, ohne Importmap)
assets/restaurant/      KayKit Restaurant Bits – genutzte glTF-Modelle + Textur
assets/character/       KayKit Mannequin + Animations-GLBs (General, MovementBasic, Tools, Simulation)
assets/ui/              Cozy UI Pack (Demo) – Panels, Buttons, Karten, Checkboxen
icons/                  App-Icons (aus dem Burger-Modell gerendert)
tools/make-icons.html   Icon-Generator (im Browser öffnen, PNGs speichern)
```

### Aufbau von index.html

Der Code ist in nummerierte Abschnitte gegliedert: 1 Konfiguration & Balancing · 2 Asset-Zuordnung ·
3 Spieldaten (Zutaten, Topfgerichte, Rezepte, Upgrades, Level, Küchenlayout) · 4 Hilfsfunktionen ·
5 SaveManager (IndexedDB) · 6 Audio · 7 AssetManager & Icons · 8 Szene/Kamera · 9 Gegenstände ·
10 Stationen · 11 Küche & Kollision · 12 Figuren · 13 Bestellungen & Gäste · 14 Level & Progression ·
15 Eingabe · 16 HUD · 17 Menüs · 18 Tutorial · 19 Zustandsmaschine · 20 PWA & Start.

Zustände: `loading → menu → countdown → playing ⇄ paused → levelComplete / gameOver`.

### Anpassen

- **Balancing** (Startmünzen, Punkte, Sternschwellen, Trinkgeld, XP-Kurve, Brenndauer …): `CONFIG` ganz oben.
- **Rezepte**: Array `RECIPES` – Bestandteile als `[Zutat, Zustand]`, Preis, Geduld, Freischaltung. Die Spiellogik
  kennt keine Einzelfälle; Wege (Kiste → Brett → Pfanne …) werden aus `INGREDIENTS[x].steps` abgeleitet.
- **Neue Zutat**: Eintrag in `INGREDIENTS` (Modelle je Zustand, Arbeitsschritte mit Dauer, Quelle) und eine
  `source`-Station in `LAYOUT`.
- **Level**: Array `LEVELS` (Dauer, Gäste, gleichzeitige Gäste, Rezept-Pool, Geduld-Faktor, Abstände).
- **Küche**: `LAYOUT.stations` im 2×2-Raster (Spalte `c`, Reihe `r`, Blickrichtung `face`). Ecken sind `decor` (nicht bedienbar),
  eine Quelle kann mit `ing: [...]` mehrere Zutaten liefern.

### Asset-Zuordnung

Alle Pfade und Rollen stehen zentral in `ASSETS` (Abschnitt 2):

| Rolle | Modell / Datei |
|---|---|
| Spielerfigur | `Mannequin_Medium.glb` + Kochmütze (prozedural) |
| Gäste | `Mannequin_Medium.glb`, eingefärbt, zufällige Mütze |
| Animationen | Idle_A/B, Running_A, Walking_A, Interact, Chopping, Cheering, Waving, Hit_A |
| Boden / Wände | `floor_kitchen`, `wall`, `wall_window_open`, `wall_half` |
| Arbeitsfläche / Anrichte | `kitchencounter_straight_A/B`, `kitchentable_B` |
| Schneidebrett | `kitchentable_A` + `cuttingboard` + `knife` |
| Pfanne / Topf | `stove_single` + `pan_A` / `pot_A` (+ `stew_pot` als Füllung) |
| Ofen | `oven` |
| Kühlschrank | `fridge_A` (Rind- und Gemüse-Patty, Tausch per Aktionstaste) |
| Kisten | `crate_buns/lettuce/tomatoes/cheese/onions/potatoes/carrots/steak/ham` |
| Teller / Ausgabe | `plate`, `kitchentable_A` |
| Gerichte | `food_burger`, `food_vegetableburger`, `food_stew`, `food_dinner`; sonst aus Zutaten zusammengesetzt |
| Zutaten | `food_ingredient_*` in allen Zuständen (roh, geschnitten, gegart, verbrannt) |
| Gästebereich | `table_round_A_small_decorated`, `chair_stool`, `menu`, Holzboden (prozedural) |
| UI | Cozy UI Pack: `Container1`, `CardRegular1_wood`, `SquareButton2_*`, `RoundButton1_white`, `ItemSlot1`, `Checkbox2_*`, `NoteContainerSimple`, `WoodenContainer1` |
| Icons im HUD | werden beim Start aus den 3D-Modellen gerendert |

**Ersatzlösungen für fehlende Assets:** Mülleimer (im Pack nicht enthalten) ist aus Grundformen gebaut;
Ofen-Pommes sind eingefärbte geschnittene Kartoffeln; verbranntes Gemüse-Patty/Zwiebelringe sind dunkel eingefärbt;
Sounds werden per WebAudio synthetisch erzeugt (keine Audiodateien vorhanden); es gibt keine Musik.
Fehlt ein Modell, erscheint ein Platzhalter-Würfel – das Spiel läuft weiter.

## Spielstand

- Gespeichert in IndexedDB (Datenbank `kuechenrallye` – interner Name aus der ersten Version, bleibt für vorhandene Spielstände), versioniert (`schema`) mit Migrationen und Bereinigung.
- Gespeichert wird nach jedem Levelende, jedem Kauf und jeder Einstellungsänderung; Speichervorgänge laufen nacheinander.
- Ein abgebrochenes Level verändert den Spielstand nicht.
- Sichern/Laden in den Optionen: als Datei speichern, über das Teilen-Menü sichern (iPhone) oder als Text kopieren/einfügen.
  Zurücksetzen nur mit Bestätigung.
- **Wichtig:** Browserdaten können vom Nutzer oder vom System gelöscht werden (z. B. bei Speichermangel oder wenn
  eine Home-Bildschirm-App lange nicht genutzt wird). Für Sicherheit regelmäßig exportieren. Safari und die
  Home-Bildschirm-App haben getrennte Speicher.

## Debug-Ansicht

Nur sichtbar mit `?debug` in der Adresse oder nach 7× Tippen auf die Versionsnummer in den Optionen:
Münzen/XP hinzufügen, alle Level/Rezepte/Upgrades freischalten, Gast erzeugen, Zeit vorspulen, Level gewinnen,
Kollisionsflächen anzeigen, FPS und Draw Calls.

## Bekannte Einschränkungen

- Echtes Vollbild gibt es auf dem iPhone nur als Home-Bildschirm-App; in Safari bleibt die Browserleiste.
  Die Bildschirmdrehung kann eine Web-App nicht zuverlässig sperren – Querformat wird empfohlen, Hochformat ist spielbar.
- Benötigt WebGL 2 (iOS 15 oder neuer, aktuelle Desktop-Browser).
- Der Service Worker funktioniert nur über HTTPS oder `localhost`.
- Nach einem Update (neue Version auf GitHub Pages) lädt die App beim nächsten Start die neue `index.html`;
  geänderte Assets erfordern eine neue `VERSION` in `sw.js`.
- Beim allerersten Start ohne Internet kann das Spiel nicht laden (danach offline).

## Credits

- 3D-Modelle und Animationen: **KayKit** von Kay Lousberg – Restaurant Bits & Character Animations (CC0), kaylousberg.com
- UI-Grafiken: **Cozy UI Pack (Demo)** von dobo_ui (itch.io)
- 3D-Engine: **three.js** (MIT-Lizenz, siehe `lib/three/LICENSE`)
