
export type CanvasSize = '1:1' | '16:9' | '9:16' | '4:3';
export type ArtStyle = 'photorealistic' | 'anime style' | 'digital art' | 'oil painting' | 'sketch' | 'watercolor painting' | 'abstract' | 'comic';
export type Quality = 'masterpiece, best quality' | 'ultra detailed, intricate details' | 'sharp focus' | '8K, high resolution' | 'bokeh, blurry background';
export type Lighting = 'cinematic lighting' | 'natural light' | 'backlight, rim light' | 'studio lighting' | 'neon';
export type ColorPalette = 'vibrant colors' | 'pastel' | 'monotone' | 'sepia';

export interface Settings {
  prompt: string;
  referenceImage: File | null;
  canvasSize: CanvasSize;
  artStyle: ArtStyle;
  quality: Quality;
  lighting: Lighting;
  colorPalette: ColorPalette;
}

export interface Option<T> {
  label: string;
  value: T;
  icon?: string;
}