import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedTestResult = readFileSync(getFixturePath('expectedTestResult.txt'), 'utf-8');
const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

test('difference between JSONs files', () => {
  expect(gendiff(file1, file2)).toEqual(expectedTestResult);
});
