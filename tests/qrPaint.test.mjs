import test from 'node:test';
import assert from 'node:assert/strict';
import { paintSvg, templateOptions } from '../src/qrPaint.ts';

const base = {
  data: 'https://example.com', width: 1024, height: 1024, margin: 128,
  dotsOptions: { type: 'square', color: '#4a148c' },
  cornersSquareOptions: { type: 'square', color: '#4a148c' },
  cornersDotOptions: { type: 'square', color: '#4a148c' },
  backgroundOptions: { color: '#ffffff' },
};
const svg = '<svg><linearGradient><stop stop-color="#010101"/><stop stop-color="#020202"/></linearGradient><rect fill="#030303"/><path fill="#040404"/><path fill="#050505"/></svg>';

test('color changes and enabling gradient do not change the QR layout', () => {
  const changed = {
    ...base, dotsOptions: { ...base.dotsOptions, color: '#123456', gradient: { type: 'linear', rotation: Math.PI / 4, colorStops: [{ offset: 0, color: '#123456' }, { offset: 1, color: '#abcdef' }] } },
    cornersSquareOptions: { ...base.cornersSquareOptions, color: '#123456' },
    cornersDotOptions: { ...base.cornersDotOptions, color: '#abcdef' },
    backgroundOptions: { color: '#ffffff00' },
  };
  assert.deepEqual(templateOptions(base), templateOptions(changed));
});

test('solid QR uses the selected color for dots and both kinds of corner', () => {
  const result = paintSvg(svg, base);
  assert.equal(result.match(/#4a148c/g)?.length, 4);
  assert.ok(result.includes('<rect fill="#ffffff"/>'));
});

test('gradient colors and transparency reach the downloadable SVG', () => {
  const options = { ...base, dotsOptions: { ...base.dotsOptions, gradient: { colorStops: [{ color: '#123456' }, { color: '#abcdef' }] } }, backgroundOptions: { color: '#ffffff00' } };
  const result = paintSvg(svg, options);
  assert.ok(result.includes('<stop stop-color="#123456"/><stop stop-color="#abcdef"/>'));
  assert.ok(result.includes('<rect fill="#ffffff00"/>'));
});

test('a selected color identical to a marker is never replaced twice', () => {
  const result = paintSvg(svg, { ...base, dotsOptions: { color: '#030303' }, backgroundOptions: { color: '#e0e0e0' } });
  assert.equal(result.match(/stop-color="#030303"/g)?.length, 2);
  assert.ok(result.includes('<rect fill="#e0e0e0"/>'));
});

test('template retains content, logo and patterns when building a new layout', () => {
  const options = { ...base, data: 'Different content', image: 'data:image/png;base64,example', dotsOptions: { ...base.dotsOptions, type: 'rounded' }, qrOptions: { errorCorrectionLevel: 'H' } };
  const result = templateOptions(options);
  assert.equal(result.data, options.data);
  assert.equal(result.image, options.image);
  assert.equal(result.dotsOptions.type, 'rounded');
  assert.equal(result.qrOptions.errorCorrectionLevel, 'H');
});
