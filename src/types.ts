/**
 * @fileoverview Цей файл є єдиним джерелом істини для ключових типів даних у застосунку.
 * Він визначає контракти для результатів аналізу, відповідей API та інших
 * спільних структур, забезпечуючи консистентність та типову безпеку.
 * @version 1.1.0
 */

// --- Типи для Внутрішньої Моделі Даних Застосунку ---

/**
 * @description Визначає структуру для результату аналізу однієї категорії.
 * Це основна модель даних, що використовується в UI-компонентах.
 * Властивості є `readonly` для забезпечення незмінності (immutability).
 */
export interface AnalysisCategory {
  /**
   * @description Назва категорії (напр., "Manipulative Content").
   * @readonly
   */
  readonly name: string;

  /**
   * @description Оцінка для цієї категорії (0-100) або `null`, якщо аналіз не проведено.
   * @readonly
   */
  readonly percentage: number | null;

  /**
   * @description Текстове обґрунтування оцінки або `null`, якщо аналіз не проведено.
   * @readonly
   */
  readonly explanation: string | null;
}

// --- Типи для Контракту API ---

/**
 * @description Визначає структуру одного елемента аналізу в сирій відповіді від API.
 * Використовує `snake_case` відповідно до JSON-контракту.
 * @private
 */
interface ApiAnalysisResultItem {
  readonly category_name: string;
  readonly percentage_score: number;
  readonly justification: string;
}

/**
 * @description Визначає структуру повної, успішної відповіді від Svitlogics AI API.
 * Властивості є `readonly` для забезпечення незмінності.
 */
export interface SvitlogicsAnalysisResponse {
  /**
   * @description Масив результатів аналізу для кожної категорії.
   * @readonly
   */
  readonly analysis_results: readonly ApiAnalysisResultItem[];
  /**
   * @description Загальний підсумок аналізу.
   * @readonly
   */
  readonly overall_summary: string;
  /**
   * @description Назва моделі AI, що була використана для аналізу.
   * @readonly
   */
  readonly usedModelName: string;
}

/**
 * @description Визначає структуру відповіді з помилкою від Svitlogics AI API.
 * Властивості є `readonly` для забезпечення незмінності.
 */
export interface SvitlogicsErrorResponse {
  /**
   * @description Текстове повідомлення про помилку.
   * @readonly
   */
  readonly error: string;
}
