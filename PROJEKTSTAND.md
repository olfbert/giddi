# Projektstand Giddi’s Kitchen Husch (Kr Spiel)

Stand: 25.10.2026 · Version 0.1.4

## Was fertig und getestet ist

- Isometrische 3D-Küche (three.js r169, orthografische Kamera, Azimut 12°, Elevation 48°) aus KayKit-Modellen.
- Spielerfigur (KayKit-Mannequin + Kochmütze) mit Idle/Rennen/Schneiden/Interagieren/Jubeln, Trage-Pose prozedural.
- Gäste (eingefärbte Mannequins, zufällige Mützen) laufen zu 4 nummerierten Ausgaben, bestellen, warten, gehen froh oder verärgert.
- 8 Rezepte, alle per automatischem Testspieler zubereitet und serviert: Salat, Klassik-Burger, Ofen-Pommes,
  Zwiebelringe, Deluxe-Burger, Veggie-Burger, Rinder-Eintopf (Topf), Keulen-Menü (Ofen + Püree aus dem Topf).
- Stationen: Kisten/Kühlschrank, 2 Schneidebretter, 2 Pfannen, Kochtopf, Ofen, Anrichten, Tellerstapel, Mülleimer, 4 Ausgaben.
  Pfanne/Topf/Ofen garen automatisch und verbrennen nach Warnung.
- Küche wächst mit gekauften Rezepten (inaktive Stationen = Arbeitsflächen).
- 8 Level + Tutorial (9 Schritte), Sterne nach Punkten, Münzen = Preis + Trinkgeld + Levelbonus, XP/Spielerlevel.
- Shop: Rezepte (Preis + Spielerlevel-Sperre) und 6 Upgrades mit Vorher→Nachher-Anzeige; Doppelkauf-Schutz.
- IndexedDB-Speicher mit Schema-Version, Migration, Bereinigung, serieller Speicherwarteschlange, Sichern/Laden (Datei, Teilen-Menü, Text), Reset.
- PWA: Manifest, Service Worker (Offline-Cache, getestet), App-Icons aus dem Burger-Modell.
- Touch: schwebender Joystick links, Aktionsknopf rechts, Linkshänder-Modus; Tastatur WASD/E/Esc.
- Pause friert alles ein; App-Wechsel pausiert automatisch; Levelabbruch ändert den Spielstand nicht.
- Debug-Ansicht über `?debug` oder 7× Tippen auf die Versionsnummer.

## Wichtige Entscheidungen

- Name „Giddi’s Kitchen Husch“ (von Flo festgelegt, vorher „Küchenrallye“) – zentral in `CONFIG.GAME_NAME`; Logo `assets/ui/logo.png` (von Flo) im Hauptmenü und Ladebildschirm;
  Home-Bildschirm-Name „Kitchen Husch“. Interne Namen (IndexedDB `kuechenrallye`, Cache-Präfix) bleiben für vorhandene Spielstände.
- Three.js ohne Importmap eingebunden (Imports in den Addons auf relative Pfade umgeschrieben) → läuft auch auf älteren iOS-Versionen.
- Bestellkarten und Tutorial-Hinweis teilen sich den oberen Streifen; die Kamera reserviert ihn (`World.topPx`).
  Hochformat: oben Anzeigen + Bestellungen in 2 Spalten + Hinweis, Mitte Küche, unten Steuerung (`World.bottomPx`).
  Wände auf 72 % Höhe skaliert. Gäste-Sprechblasen werden auf schmalen Bildschirmen kompakt (Nummer + Geduldsring).
- Gäste-Zuordnung explizit über die Ausgabe des jeweiligen Gastes; falsche Teller werden abgelehnt mit Hinweis.
- Sounds synthetisch (WebAudio), keine Musik – keine Audio-Assets vorhanden.

## Änderungen

- 0.1.4: Logo „Giddi’s Kitchen Husch“ im Hauptmenü (quer rechts, hoch oben) und auf dem Ladebildschirm.
- 0.1.3: Kühlschrank aus der Ecke neben die Brötchen-Kiste (Wunsch von Flo); ein Kühlschrank für Rind- und Gemüse-Patty (Tausch per Aktionstaste);
  Ecken nur noch Deko; Zwiebel-Kiste in die vordere Reihe, Tellerstapel auf die Kücheninsel, Mülleimer vorne rechts.
- 0.1.2: Umbenannt in „Giddi’s Kitchen Husch“.
- 0.1.1: Tutorial-Hinweis verdeckt die Küche nicht mehr (v. a. Hochformat); Hochformat-Layout neu; Sprechblasen bleiben im Bild.

## Mögliche nächste Schritte

- Weitere Assets einbinden (z. B. KayKit-Figuren für Koch/Gäste, Sounds, Musik) – über `ASSETS` in index.html.
- Abwasch-Mechanik (schmutzige Teller), zweite Küche/Layout für spätere Level, Endlosmodus.
- Balancing nach echten Testrunden auf dem iPhone anpassen (`CONFIG`, `LEVELS`, `UPGRADES`).
