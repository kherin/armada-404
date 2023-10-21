import "./audio.css";

import duck from "@/assets/imgs/duck.jpeg";

import SpeechRecognitionComponent from "@/components/speech-recognition";

export default function UploadAudioPage() {
  return (
    <div className="sd-orange p-4 h-full w-full">
      <div className="flex justify-center mx-10 rounded-full mb-10">
        <img src={duck} width={"150px"} height={"150px"} />
      </div>
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="sd-yellow text-2xl font-semibold mb-4 text-center">
          Upload Audio file of the Online Meeting
        </h1>

        <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="audioFile"
              className="block text-sm font-medium text-gray-700"
            >
              Choose an audio file:
            </label>
            <input
              type="file"
              name="audioFile"
              id="audioFile"
              className="mt-1 p-2 block w-full border rounded-md bg-gray-100"
              accept=".mp3, .wav, .ogg"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
      <SpeechRecognitionComponent />
    </div>
  );
}
