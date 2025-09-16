import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер для обновления значения через delay миллисекунд
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер, если значение изменилось до истечения времени
    // или если компонент размонтируется
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Перезапускаем эффект только если изменились value или delay

  return debouncedValue;
}