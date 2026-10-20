import { useEffect, useMemo, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { Options } from 'qr-code-styling';
import { paintSvg, templateOptions } from './qrPaint';

export type ExportFormat = 'png' | 'svg' | 'jpeg';
type Files = Record<ExportFormat, string>;
type Template = { layout: Options; svg?: string; error?: string };
type ExportState = { options: Options; preview?: string; files?: Files; error?: string };

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeout = window.setTimeout(() => {
      image.onload = image.onerror = null;
      reject(new Error('The QR image took too long to load. Try removing the logo.'));
    }, 15000);
    image.onload = () => { clearTimeout(timeout); resolve(image); };
    image.onerror = () => { clearTimeout(timeout); reject(new Error('Unable to prepare this QR image. Try a different logo.')); };
    image.src = url;
  });
}

function canvasBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Unable to create the download. Please try again.')), type, 1);
  });
}

export function useQrExport(options: Options, valid: boolean) {
  const [template, setTemplate] = useState<Template>();
  const [state, setState] = useState<ExportState>();

  // Colors do not change the expensive QR layout. Scalar dependencies avoid
  // invalidating this cache when the parent creates new nested option objects.
  const layout = useMemo(() => templateOptions(options), [
    options.data, options.type, options.shape, options.width, options.height, options.margin,
    options.qrOptions?.typeNumber, options.qrOptions?.mode, options.qrOptions?.errorCorrectionLevel,
    options.dotsOptions?.type, options.dotsOptions?.roundSize,
    options.cornersSquareOptions?.type, options.cornersDotOptions?.type,
    options.backgroundOptions?.round, options.image,
    options.imageOptions?.saveAsBlob, options.imageOptions?.crossOrigin,
    options.imageOptions?.margin, options.imageOptions?.imageSize, options.imageOptions?.hideBackgroundDots,
  ]);

  useEffect(() => {
    if (!valid) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const qr = new QRCodeStyling(layout);
        const raw = await qr.getRawData('svg');
        if (cancelled) return;
        if (!(raw instanceof Blob) || !raw.size) throw new Error('Unable to generate this QR code. Shorten the content and try again.');
        const svg = await raw.text();
        if (!cancelled) setTemplate({ layout, svg });
      } catch (error) {
        if (!cancelled) setTemplate({ layout, error: error instanceof Error ? error.message : 'Unable to generate this QR code. Shorten the content and try again.' });
      }
    }, 100);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [layout, valid]);

  useEffect(() => {
    if (!valid || template?.layout !== layout || !template.svg) return;
    let cancelled = false;
    let exported = false;
    let timer: number | undefined;
    const urls: string[] = [];
    const createUrl = (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      urls.push(url);
      return url;
    };

    // Coalesce picker events into one cheap repaint per display frame.
    const frame = requestAnimationFrame(() => {
      const svgUrl = createUrl(new Blob([paintSvg(template.svg!, options)], { type: 'image/svg+xml' }));
      setState({ options, preview: svgUrl });

      // Prepare native download links only after the user pauses selection.
      timer = window.setTimeout(async () => {
        try {
          const image = await loadImage(svgUrl);
          if (cancelled) return;
          const canvas = document.createElement('canvas');
          canvas.width = options.width || 1024;
          canvas.height = options.height || 1024;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Image export is unavailable in this browser.');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const png = await canvasBlob(canvas, 'image/png');
          if (cancelled) return;
          context.globalCompositeOperation = 'destination-over';
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          const jpeg = await canvasBlob(canvas, 'image/jpeg');
          if (cancelled) return;
          exported = true;
          setState({ options, preview: svgUrl, files: { svg: svgUrl, png: createUrl(png), jpeg: createUrl(jpeg) } });
        } catch (error) {
          if (!cancelled) setState({ options, preview: svgUrl, error: error instanceof Error ? error.message : 'Unable to prepare the download. Please try again.' });
        }
      }, 250);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      // Retain clicked download URLs long enough for the browser to save them.
      window.setTimeout(() => urls.forEach(url => URL.revokeObjectURL(url)), exported ? 30000 : 1000);
    };
  }, [options, valid, layout, template]);

  const current = valid && state?.options === options;
  const layoutError = valid && template?.layout === layout ? template.error : '';
  const error = layoutError || (current ? state.error : '') || '';
  return {
    // Keep the last preview visible rather than flashing a loader during edits.
    preview: valid && !layoutError ? state?.preview : undefined,
    files: current && !error ? state.files : undefined,
    error,
    preparing: valid && !error && (!current || !state.files),
  };
}
