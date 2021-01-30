+++
title = "Utilisation de Puppeteer pour lire les données de table"
subtitle = "Exemple de base sur l'utilisation de Puppeteer pour lire le contenu d'un élément de table."
tags = ['web']
date = 2021-01-29

# For description meta tag
description = "Utilisation de Puppeteer pour lire les données de table"

# Comment next line and the default banner wil be used.
banner = 'img/puppeteer_logo.png'

+++

## What is [Puppeteer](https://pptr.dev/)?

Puppeteer est une bibliothèque de nœuds qui fournit une API de haut niveau pour contrôler Chrome ou Chromium via le [protocole DevTools](https://chromedevtools.github.io/devtools-protocol/). Le marionnettiste court [sans tête](https://developers.google.com/web/updates/2017/04/headless-chrome) par défaut, mais peut être configuré pour exécuter Chrome ou Chromium complet (sans tête).

## Pourquoi utiliser Puppeteer?

Imagerie qu'il n'y a pas d'API pour obtenir des données à partir d'un site public. En utilisant Puppeteer, vous pouvez rendre le contenu d'une page Web et en supprimer des données.

En outre, Puppeteer propose plusieurs fonctionnalités en plus des données, telles que la génération de captures d'écran et de PDF à partir de pages, l'automatisation de la soumission de formulaires, les tests d'interface utilisateur, la saisie au clavier, etc.

Un bon exemple de cela serait d'obtenir des données liées au COVID-19 à partir d'un site Web gouvernemental comme [covid19honduras.org](https://covid19honduras.org/). Ils ne fournissent pas d'API pour récupérer les données.

![](https://raw.githubusercontent.com/Javier3131/datascrapper/main/Screen%20Shot%202021-01-29%20at%209.34.22%20PM.png)

## Préparation

Dans cet exemple, nous allons utiliser NodeJS pour créer une application côté serveur à supprimer [covid19honduras.org](https://covid19honduras.org/) et obtenir spécifiquement les données du tableau des cas confirmés par départements. Si vous allez sur le site et inspectez la table, vous allez voir l'identifiant de la table, nous allons utiliser cet identifiant pour obtenir cet élément.

1. Créer un nouveau projet

   ```javascript
   npm init
   ```

2. Installez Puppeteer

   ```javascript
   npm install --save puppeteer
   ```

3. Créez un fichier index.js. Ce sera l'endroit où nous allons ajouter le code suivant.

## Récupérer les données d'un tableau HTML

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://covid19honduras.org/';

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.goto(url);

    // Method to create a faster Page
    // From: https://github.com/shirshak55/scrapper-tools/blob/master/src/fastPage/index.ts#L113
    const session = await page.target().createCDPSession();
    await page.setBypassCSP(true);
    await session.send('Page.enable');
    await session.send('Page.setWebLifecycleState', {
      state: 'active',
    });

    // Bloquea la carga de recursos como imagenes y css
    await page.setRequestInterception(true);

    const rawData = await page.evaluate(() => {
      let data = [];
      let table = document.getElementById('tablaDatos');

      for (var i = 1; i < table.rows.length; i++) {
        let objCells = table.rows.item(i).cells;

        let values = [];
        for (var j = 0; j < objCells.length; j++) {
          let text = objCells.item(j).innerHTML;
          values.push(text);
        }
        let d = { i, values };
        data.push(d);
      }

      return data;
    });

    console.log(rawData);
  } catch (error) {
    console.log('error', error);
  }
})();
```

## Résultat

![](https://raw.githubusercontent.com/Javier3131/datascrapper/main/Screen%20Shot%202021-01-29%20at%204.07.45%20PM.png)
