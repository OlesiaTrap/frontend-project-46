import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileContent = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');

const gendiff = (filepath1, filepath2) => {
  const jsonData1 = JSON.parse(getFileContent(filepath1));
  const jsonData2 = JSON.parse(getFileContent(filepath2));

  const allKeys = _.union(Object.keys(jsonData1), Object.keys(jsonData2));
  allKeys.sort();

  let diffResult = '{\n';

  for (let i = 0; i < allKeys.length; i += 1) {
    const key = allKeys[i];
    if (!Object.prototype.hasOwnProperty.call(jsonData1, key)) {
      diffResult += `  + ${key}: ${jsonData2[key]}\n`;
    } else if (!Object.prototype.hasOwnProperty.call(jsonData2, key)) {
      diffResult += `  - ${key}: ${jsonData1[key]}\n`;
    } else if (jsonData1[key] !== jsonData2[key]) {
      diffResult += `  - ${key}: ${jsonData1[key]}\n  + ${key}: ${jsonData2[key]}\n`;
    } else {
      diffResult += `    ${key}: ${jsonData1[key]}\n`;
    }
  }

  diffResult += '}\n';

  return diffResult;
};

export default gendiff;
