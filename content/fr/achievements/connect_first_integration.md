+++
title = "Connect First Integration"
subtitle = "Intégration du numéroteur avec un logiciel personnalisé."
tags = ['web']
date = 2019-01-30

# For description meta tag
description = "Intégration du numéroteur avec un logiciel personnalisé."

# Comment next line and the default banner wil be used.
banner = 'img/connectFirstLogo.jpg'

+++

## Le problème

La nécessité d'automatiser la génération de rapports et de maintenir à jour les informations de notre base de données vers le numéroteur.

## La solution

J'étais le développeur chargé de créer un flux de travail afin que les administrateurs du numéroteur puissent gérer les informations du numéroteur avec la base de données du client. Par exemple, lorsqu'un nouvel agent est créé sur le système du client, l'accès au numéroteur sera également créé.

Pour garder les informations de nos rapports toujours à jour, j'ai créé des services afin que le composeur puisse nous faire des demandes avec les informations de l'appel et ainsi pouvoir les enregistrer dans la base de données du client.

## Technologie utilisée

- ASP .NET C#
- REST API
- MSSQL
- AngularJS
- HTML/CSS
