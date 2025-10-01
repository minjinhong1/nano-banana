
import React, { useCallback, useState } from 'react';
import type { Settings } from '../types';
import { CANVAS_SIZES, ART_STYLES, QUALITY_OPTIONS, LIGHTING_OPTIONS, COLOR_PALETTE_OPTIONS } from '../constants';
import { OptionGroup } from './OptionGroup';
import { SelectGroup } from './SelectGroup';

interface SettingsPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings, onGenerate, isLoading }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSettings(s => ({ ...s, referenceImage: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [setSettings]);

  const removeImage = useCallback(() => {
    setSettings(s => ({ ...s, referenceImage: null }));
    setImagePreview(null);
  }, [setSettings]);

  return (
    <aside className="w-full lg:w-1/3 xl:w-1/4 bg-gray-800 p-6 overflow-y-auto max-h-screen">
      <div className="space-y-8">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-purple-300 mb-2">프롬프트</label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-gray-200 p-3 transition"
            placeholder="생성하고 싶은 이미지에 대해 한국어로 설명해주세요."
            value={settings.prompt}
            onChange={(e) => setSettings(s => ({ ...s, prompt: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">참고 이미지 (선택)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative group">
                  <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md object-cover" />
                  <button onClick={removeImage} className="absolute top-0 right-0 m-1 p-1 bg-red-600/80 hover:bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              ) : (
                 <>
                  <i className="fa-solid fa-image mx-auto h-12 w-12 text-gray-500"></i>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-purple-500 px-2">
                      <span>이미지 업로드</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </>
              )}
            </div>
          </div>
        </div>

        <OptionGroup
          label="캔버스 사이즈"
          options={CANVAS_SIZES}
          selectedValue={settings.canvasSize}
          onChange={(value) => setSettings(s => ({ ...s, canvasSize: value }))}
        />

        <OptionGroup
          label="아트 스타일"
          options={ART_STYLES}
          selectedValue={settings.artStyle}
          onChange={(value) => setSettings(s => ({ ...s, artStyle: value }))}
        />

        <SelectGroup
          label="화질 설정"
          options={QUALITY_OPTIONS}
          selectedValue={settings.quality}
          onChange={(value) => setSettings(s => ({ ...s, quality: value }))}
        />

        <SelectGroup
          label="조명 설정"
          options={LIGHTING_OPTIONS}
          selectedValue={settings.lighting}
          onChange={(value) => setSettings(s => ({ ...s, lighting: value }))}
        />
        
        <SelectGroup
          label="컬러 팔레트"
          options={COLOR_PALETTE_OPTIONS}
          selectedValue={settings.colorPalette}
          onChange={(value) => setSettings(s => ({ ...s, colorPalette: value }))}
        />
        
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              생성 중...
            </>
          ) : (
            '★ 생성'
          )}
        </button>
      </div>
    </aside>
  );
};
