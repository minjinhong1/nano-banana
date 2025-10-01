
import React, { useState, useCallback } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { ImageDisplay } from './components/ImageDisplay';
import { translateKoreanToEnglish, generateImage } from './services/geminiService';
import type { Settings } from './types';
import { CANVAS_SIZES, ART_STYLES, QUALITY_OPTIONS, LIGHTING_OPTIONS, COLOR_PALETTE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    prompt: '',
    referenceImage: null,
    canvasSize: CANVAS_SIZES[0].value,
    artStyle: ART_STYLES[0].value,
    quality: QUALITY_OPTIONS[0].value,
    lighting: LIGHTING_OPTIONS[0].value,
    colorPalette: COLOR_PALETTE_OPTIONS[0].value,
  });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [finalPrompt, setFinalPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!settings.prompt) {
      setError('프롬프트를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setFinalPrompt(null);

    try {
      const englishPrompt = await translateKoreanToEnglish(settings.prompt);
      const { imageDataUrl, finalPrompt } = await generateImage(englishPrompt, settings);
      setGeneratedImage(imageDataUrl);
      setFinalPrompt(finalPrompt);
    } catch (err) {
      console.error(err);
      setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [settings]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-gray-900 text-gray-200">
      <SettingsPanel settings={settings} setSettings={setSettings} onGenerate={handleGenerate} isLoading={isLoading} />
      <ImageDisplay 
        generatedImage={generatedImage} 
        isLoading={isLoading} 
        error={error} 
        finalPrompt={finalPrompt} 
        originalPrompt={settings.prompt}
      />
    </div>
  );
};

export default App;
