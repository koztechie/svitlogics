/**
 * @fileoverview Цей файл містить декларації типів для середовища Vite.
 * Він розширює стандартні можливості TypeScript, повідомляючи йому, як
 * обробляти специфічні для Vite імпорти, такі як SVG-файли як React-компоненти.
 * @warning **Цей файл є частиною конфігурації середовища.** Не редагуйте його,
 * якщо ви не розумієте наслідків для системи типів всього проекту.
 * @version 1.1.0
 */

/// <reference types="vite/client" />

/**
 * @description
 * Оголошує глобальний модуль для імпортів, що відповідають патерну `*.svg?react`.
 * Це дозволяє TypeScript розуміти конструкції виду:
 * `import MyIcon from './assets/icon.svg?react';`
 *
 * Ця функціональність забезпечується плагіном `vite-plugin-svgr`.
 * Декларація типізує результат такого імпорту як React-компонент.
 */
declare module "*.svg?react" {
  import * as React from "react";

  /**
   * @description
   * Тип для React-компонента, що генерується з SVG-файлу.
   * Він приймає всі стандартні пропси для SVG, а також опціональний `title`
   * для покращення доступності (a11y).
   */
  const SvgAsReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default SvgAsReactComponent;
}
