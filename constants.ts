
import type { Option, CanvasSize, ArtStyle, Quality, Lighting, ColorPalette } from './types';

export const CANVAS_SIZES: Option<CanvasSize>[] = [
  { label: '1:1 (정사각형)', value: '1:1', icon: 'fa-solid fa-square' },
  { label: '16:9 (와이드)', value: '16:9', icon: 'fa-solid fa-panorama' },
  { label: '9:16 (세로)', value: '9:16', icon: 'fa-solid fa-mobile-screen-button' },
  { label: '4:3 (클래식)', value: '4:3', icon: 'fa-solid fa-tv-retro' },
];

export const ART_STYLES: Option<ArtStyle>[] = [
  { label: '사진', value: 'photorealistic', icon: 'fa-solid fa-camera-retro' },
  { label: '애니메이션', value: 'anime style', icon: 'fa-solid fa-ghost' },
  { label: '디지털 아트', value: 'digital art', icon: 'fa-solid fa-pen-nib' },
  { label: '유화', value: 'oil painting', icon: 'fa-solid fa-palette' },
  { label: '스케치', value: 'sketch', icon: 'fa-solid fa-pencil' },
  { label: '수채화', value: 'watercolor painting', icon: 'fa-solid fa-brush' },
  { label: '추상화', value: 'abstract', icon: 'fa-solid fa-shapes' },
  { label: '만화', value: 'comic', icon: 'fa-solid fa-comment-dots' },
];

export const QUALITY_OPTIONS: Option<Quality>[] = [
  { label: '최고화질', value: 'masterpiece, best quality' },
  { label: '초고해상도', value: 'ultra detailed, intricate details' },
  { label: '선명한 초점', value: 'sharp focus' },
  { label: '8K', value: '8K, high resolution' },
  { label: '흐림 효과', value: 'bokeh, blurry background' },
];

export const LIGHTING_OPTIONS: Option<Lighting>[] = [
  { label: '시네마틱', value: 'cinematic lighting' },
  { label: '자연광', value: 'natural light' },
  { label: '역광', value: 'backlight, rim light' },
  { label: '스튜디오 조명', value: 'studio lighting' },
  { label: '네온', value: 'neon' },
];

export const COLOR_PALETTE_OPTIONS: Option<ColorPalette>[] = [
  { label: '선명한 색', value: 'vibrant colors' },
  { label: '파스텔', value: 'pastel' },
  { label: '모노톤', value: 'monotone' },
  { label: '세피아', value: 'sepia' },
];