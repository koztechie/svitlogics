// src/hooks/useAdaptiveProgress.ts

import { useState, useEffect, useRef, useCallback } from "react";
import { getStats } from "../services/statsApiService";

// --- Типізація ---

type Language = "en" | "uk";

interface StatEntry {
  duration: number;
  charCount: number;
  language: Language;
  timestamp: number;
}

interface AnalysisStats {
  en?: StatEntry[];
  uk?: StatEntry[];
}

interface UseAdaptiveProgressReturn {
  estimatedDuration: number;
  isOvertime: boolean;
  isError: boolean;
  start: (charCount: number, language: Language) => void;
  stop: () => void;
  reset: () => void;
}

// Дефолтні коефіцієнти (мс на символ), якщо даних ще немає
const DEFAULT_RATIOS: Record<Language, number> = {
  en: 15,
  uk: 20,
};

const OVERTIME_DELAY = 60000; // 1 хвилина

/**
 * @description Хук для керування адаптивним прогрес-баром.
 * Завантажує статистику, розраховує очікуваний час аналізу на основі медіани,
 * та керує станами "перевищення часу" та "помилки".
 */
export const useAdaptiveProgress = (): UseAdaptiveProgressReturn => {
  const [stats, setStats] = useState<AnalysisStats>({});
  const [estimatedDuration, setEstimatedDuration] = useState(0);
  const [isOvertime, setIsOvertime] = useState(false);
  const [isError, setIsError] = useState(false);

  const overtimeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Завантаження статистики при першому рендері
  useEffect(() => {
    const fetchStats = async () => {
      const fetchedStats = await getStats();
      setStats(fetchedStats);
    };
    fetchStats();
  }, []);

  // 2. Функція для очищення таймерів
  const stop = useCallback(() => {
    if (overtimeTimerRef.current) clearTimeout(overtimeTimerRef.current);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
  }, []);

  // 3. Функція для повного скидання стану
  const reset = useCallback(() => {
    stop();
    setEstimatedDuration(0);
    setIsOvertime(false);
    setIsError(false);
  }, [stop]);

  // 4. Головна функція для запуску
  const start = useCallback(
    (charCount: number, language: Language) => {
      reset(); // Спочатку скидаємо попередні стани

      const languageStats = stats[language] || [];
      let medianRatio: number;

      if (languageStats.length > 0) {
        // Розраховуємо коефіцієнт для кожного запису
        const ratios = languageStats.map((s) => s.duration / s.charCount);
        // Сортуємо для знаходження медіани
        ratios.sort((a, b) => a - b);
        // Знаходимо медіану
        const mid = Math.floor(ratios.length / 2);
        medianRatio =
          ratios.length % 2 !== 0
            ? ratios[mid]
            : (ratios[mid - 1] + ratios[mid]) / 2;
      } else {
        // Використовуємо дефолтне значення, якщо статистики немає
        medianRatio = DEFAULT_RATIOS[language];
      }

      const calculatedDuration = Math.round(charCount * medianRatio);
      setEstimatedDuration(calculatedDuration);

      // Запускаємо таймери
      overtimeTimerRef.current = setTimeout(() => {
        setIsOvertime(true);
      }, calculatedDuration);

      errorTimerRef.current = setTimeout(() => {
        setIsError(true);
      }, calculatedDuration + OVERTIME_DELAY);
    },
    [stats, reset]
  );

  return {
    estimatedDuration,
    isOvertime,
    isError,
    start,
    stop,
    reset,
  };
};
