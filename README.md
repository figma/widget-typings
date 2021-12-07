# Figma Widget API typings

[![npm](https://img.shields.io/npm/v/@figma/widget-typings?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/@figma/widget-typings)

This repository contains the typings for the Figma Widget API.

## Usage

1. Installation
   
   Note that the widget api is an extention of the plugin api so you should install both `@figma/plugin-typings` and `@figma/widget-typings`

   ```sh
   npm i --save-dev @figma/plugin-typings @figma/widget-typings
   ```

2. Configure _tsconfig.json_

   ```js
   {
       "compilerOptions": {
           "typeRoots": [
               "./node_modules/@types",
               "./node_modules/@figma"
           ]
       }
   }
   ```

   The configuration above is needed for the TypeScript compiler to use type definitions found in both `./node_modules/@types` and `./node_modules/@figma`. Normally, most external type definitions are from DefinitelyTyped and are installed in `/@types`, which included by TypeScript by default. Since we host the plugin & widget typings separately, they are installed outside in `/@figma` instead.

   Types should become globally available without needing to use import statements. We do it this way because the widget API is part of the host environment, as opposed to being a package that a plugin includes.

## About

Widget API releases have the format "Version X, Update Y". Equivalent tags are created in this repository as `v<x>.<y>`. Note that not all API releases include API changes, some are just bug fixes. Therefore, some typings versions are skipped.
