
declare module 'google-tts-api' {
  export default function googleTTS(
    text: string,
    lang?: string,
    speed?: number,
    timeout?: number
  ): Promise<string>;
}
