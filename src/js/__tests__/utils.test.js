import { parseCoordinates } from '../utils';

describe('parseCoordinates', () => {
  test('Должен корректно обрабатывать координаты с пробелом', () => {
    const input = '51.50851, -0.12572';
    const expectedOutput = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expectedOutput);
  });

  test('Должен корректно обрабатывать координаты без пробела', () => {
    const input = '51.50851,-0.12572';
    const expectedOutput = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expectedOutput);
  });

  test('Должен корректно обрабатывать координаты в квадратных скобках', () => {
    const input = '[51.50851, -0.12572]';
    const expectedOutput = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expectedOutput);
  });

  test('Должен генерировать ошибку для некорректного формата', () => {
    const input = 'Некорректный ввод';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });

  test('Должен генерировать ошибку для неверного разделителя', () => {
    const input = '51.50851; -0.12572';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });

  test('Должен генерировать ошибку при отсутствии одной из координат', () => {
    const input = '51.50851,';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });

  test('Должен генерировать ошибку при лишних символах', () => {
    const input = '51.50851, -0.12572 extra';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });

  test('Должен генерировать ошибку при отсутствии запятой', () => {
    const input = '51.50851 -0.12572';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });

  test('Должен генерировать ошибку при нечисловых значениях', () => {
    const input = 'abc, def';
    expect(() => parseCoordinates(input)).toThrow('Invalid format');
  });
});
