const path = require('path');
const fs = require('fs');
const parser = require('./huff/src/parser');

const modulesPath = path.posix.resolve(__dirname, './src/huff_modules');
const OUT_PATH = 'out/';

const copierParsed = parser.parseFile('codecopier.huff', modulesPath);

const APPENDED_DATA = 'f0f0f0f0'

const runtimeShallow = parser.processMacro(
  'RUNTIME',
  0,
  [ '00' ],
  copierParsed.macros,
  copierParsed.inputMap,
  copierParsed.jumptables
).data.bytecode;

const constructorShallow = parser.processMacro(
  'CONSTRUCTOR',
  0,
  [ '00' ],
  copierParsed.macros,
  copierParsed.inputMap,
  copierParsed.jumptables,
).data.bytecode;

if (lenBytes(runtimeShallow) > 255) throw "runtime whoops"
if (lenBytes(constructorShallow) > 255) throw "constructor whoops"

const runtime = parser.processMacro(
  'RUNTIME',
  0,
  [ lenBytes(runtimeShallow).toString() ],
  copierParsed.macros,
  copierParsed.inputMap,
  copierParsed.jumptables
).data.bytecode

const constructor = parser.processMacro(
  'CONSTRUCTOR',
  0,
  [ lenBytes(constructorShallow).toString() ],
  copierParsed.macros,
  copierParsed.inputMap,
  copierParsed.jumptables,
).data.bytecode;

writeBin('codecopier-runtime.bin', runtime + trimBytes(APPENDED_DATA));
writeBin('codecopier.bin', constructor + runtime + trimBytes(APPENDED_DATA));

console.log(`bytecode written to ${OUT_PATH}`);

function lenBytes(str) {
  return trimBytes(str).length / 2
}

function trimBytes(str) {
  if (str.length % 2 !== 0) {
    throw 'ERR: These aint bytes'
  }
  return str.replace(/^0x/,'')
}

function writeBin(filename, bytecode) {
  fs.writeFileSync(path.posix.resolve(__dirname, OUT_PATH + filename), bytecode);
}
