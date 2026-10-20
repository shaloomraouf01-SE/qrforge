import type { Options } from 'qr-code-styling';

const paint = {
  primary: '#010101', secondary: '#020202', background: '#030303',
  corner: '#040404', center: '#050505',
};

// A solid color uses identical gradient stops, so toggling gradient is a repaint.
export function templateOptions(options: Options): Options {
  return {
    ...options,
    dotsOptions: {
      ...options.dotsOptions, color: paint.primary,
      gradient: { type: 'linear', rotation: Math.PI / 4, colorStops: [
        { offset: 0, color: paint.primary }, { offset: 1, color: paint.secondary },
      ] },
    },
    backgroundOptions: { ...options.backgroundOptions, color: paint.background, gradient: undefined },
    cornersSquareOptions: { ...options.cornersSquareOptions, color: paint.corner, gradient: undefined },
    cornersDotOptions: { ...options.cornersDotOptions, color: paint.center, gradient: undefined },
  };
}

export function paintSvg(template: string, options: Options): string {
  const primary = options.dotsOptions?.color || '#000000';
  const colors: Record<string, string> = {
    [paint.primary]: options.dotsOptions?.gradient?.colorStops[0]?.color || primary,
    [paint.secondary]: options.dotsOptions?.gradient?.colorStops[1]?.color || primary,
    [paint.background]: options.backgroundOptions?.color || '#ffffff',
    [paint.corner]: options.cornersSquareOptions?.color || primary,
    [paint.center]: options.cornersDotOptions?.color || primary,
  };
  // One pass handles selected colors that happen to equal another marker.
  return template.replace(/#010101|#020202|#030303|#040404|#050505/g, color => colors[color]);
}
