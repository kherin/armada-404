// SpeechRecognitionComponent.tsx

import React, { useState, useEffect } from "react";

const SpeechRecognitionComponent: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };

      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last][0];
        setTranscript(result.transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (error: any) => {
        console.error("Speech recognition error:", error);
      };

      return () => {
        recognition.stop();
      };
    } else {
      console.error("Speech recognition is not supported in your browser.");
    }
  }, []);

  const startListening = () => {
    if (isListening) return;
    setIsListening(true);
    window.SpeechRecognition.start();
  };

  const stopListening = () => {
    if (!isListening) return;
    setIsListening(false);
    window.SpeechRecognition.stop();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  useEffect(() => {
    if (audioFile) {
      const audioContext = new AudioContext();
      const reader = new FileReader();

      reader.onload = async (e) => {
        const audioBuffer = await audioContext.decodeAudioData(
          e.target.result as ArrayBuffer
        );
        const audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;

        audioSource.connect(audioContext.destination);
        audioSource.start();

        audioSource.onended = () => {
          audioContext.close();
          startListening(); // Start speech recognition after audio playback
        };
      };

      reader.readAsArrayBuffer(audioFile);
    }
  }, [audioFile]);

  return (
    <div>
      <h2>Speech Recognition</h2>
      <input type="file" accept=".wav, .mp3" onChange={handleFileUpload} />
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
