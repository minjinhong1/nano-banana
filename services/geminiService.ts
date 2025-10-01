
import { GoogleGenAI, Modality } from '@google/genai';
import type { Settings, CanvasSize } from '../types';
import { GenerateContentResponse } from '@google/genai';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const translationModel = 'gemini-2.5-flash';
// FIX: Use appropriate models for image editing and generation
const imageEditModel = 'gemini-2.5-flash-image-preview'; // Nano Banana
const imageGenerationModel = 'imagen-4.0-generate-001';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const translateKoreanToEnglish = async (prompt: string): Promise<string> => {
  const fullPrompt = `Translate the following Korean text to English: "${prompt}"`;
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: translationModel,
    contents: fullPrompt,
  });
  return response.text.trim();
};

const getAspectRatioText = (canvasSize: CanvasSize): string => {
    return `${canvasSize} aspect ratio`;
}

export const generateImage = async (englishPrompt: string, settings: Settings): Promise<{ imageDataUrl: string; finalPrompt: string }> => {
  // FIX: Refactored to use correct Gemini API for image generation vs. image editing, and fixed type error.
  if (settings.referenceImage) {
    // Use image editing model when a reference image is provided
    const keywords = [
      settings.quality,
      settings.lighting,
      settings.colorPalette,
      settings.artStyle,
      getAspectRatioText(settings.canvasSize)
    ].join(', ');

    const finalPrompt = `${keywords}, ${englishPrompt}`;
    console.log("Final prompt for image editing:", finalPrompt);

    const imagePart = await fileToGenerativePart(settings.referenceImage);
    const textPart = { text: finalPrompt };
    const parts = [imagePart, textPart];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: imageEditModel,
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return { 
          imageDataUrl: `data:${mimeType};base64,${base64ImageBytes}`, 
          finalPrompt 
        };
      }
    }

    throw new Error('No image data found in the API response.');
  } else {
    // Use image generation model for text-to-image prompts
    const keywords = [
      settings.quality,
      settings.lighting,
      settings.colorPalette,
      settings.artStyle,
    ].join(', ');

    const finalPrompt = `${keywords}, ${englishPrompt}`;
    console.log("Final prompt for image generation:", finalPrompt);

    const response = await ai.models.generateImages({
      model: imageGenerationModel,
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: settings.canvasSize,
      },
    });

    if (response.generatedImages?.[0]?.image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return { 
        imageDataUrl: `data:image/png;base64,${base64ImageBytes}`, 
        finalPrompt 
      };
    }
    
    throw new Error('No image data found in the API response.');
  }
};
