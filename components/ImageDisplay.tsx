
import React, { useState } from 'react';

interface ImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  finalPrompt: string | null;
  originalPrompt: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImage, isLoading, error, finalPrompt, originalPrompt }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (finalPrompt) {
      navigator.clipboard.writeText(finalPrompt).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  return (
    <main className="w-full lg:w-2/3 xl:w-3/4 flex-grow flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center bg-black/20 rounded-xl border border-gray-700 overflow-hidden">
        {isLoading && (
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">이미지를 생성하고 있습니다...</p>
            <p className="text-sm">잠시만 기다려주세요.</p>
          </div>
        )}
        {error && (
            <div className="text-center text-red-400 p-4">
                <i className="fa-solid fa-circle-exclamation text-4xl mb-4"></i>
                <p className="text-lg font-semibold">오류 발생</p>
                <p>{error}</p>
            </div>
        )}
        {!isLoading && !error && generatedImage && (
          <div className="w-full h-full flex flex-col">
            <div className="flex-grow flex items-center justify-center overflow-hidden p-4">
              <img
                src={generatedImage}
                alt="Generated"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {(originalPrompt || finalPrompt) && (
              <div className="flex-shrink-0 p-4 bg-black/30 border-t border-gray-700 space-y-3">
                {originalPrompt && (
                  <div>
                    <p className="text-xs text-purple-300 font-bold mb-1 tracking-wider">
                      <i className="fa-solid fa-keyboard mr-2 opacity-80"></i>입력 프롬프트
                    </p>
                    <p className="text-sm text-gray-300 font-sans break-words">
                      {originalPrompt}
                    </p>
                  </div>
                )}
                {finalPrompt && (
                  <div className="relative group">
                    <p className="text-xs text-purple-300 font-bold mb-1 tracking-wider">
                       <i className="fa-solid fa-wand-magic-sparkles mr-2 opacity-80"></i>최종 생성 프롬프트
                    </p>
                    <p className="text-sm text-gray-300 font-mono break-words pr-12">
                      {finalPrompt}
                    </p>
                    <button
                      onClick={handleCopy}
                      title={isCopied ? "복사됨!" : "프롬프트 복사"}
                      className="absolute top-0 right-0 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                      aria-label="최종 프롬프트 복사"
                    >
                      {isCopied ? (
                        <i className="fa-solid fa-check text-green-400"></i>
                      ) : (
                        <i className="fa-regular fa-copy"></i>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {!isLoading && !error && !generatedImage && (
          <div className="text-center text-gray-500">
             <i className="fa-regular fa-image text-6xl mb-4"></i>
            <p className="text-2xl font-bold">생성된 이미지가 여기에 표시됩니다</p>
            <p className="mt-2 text-gray-400">왼쪽 패널에서 옵션을 선택하고 '생성' 버튼을 눌러주세요.</p>
          </div>
        )}
      </div>
    </main>
  );
};
