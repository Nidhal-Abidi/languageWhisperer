import axios from "axios";
import fs from "node:fs";
import path from "path";
import FormData from "form-data";
import { STT_SERVICE_URL } from "..";

export const transcribeAudio = async (
  audioFilePath: string
): Promise<string> => {
  const formData = new FormData();
  const audioFile = fs.readFileSync(audioFilePath);

  formData.append("audio_file", audioFile, {
    filename: path.basename(audioFilePath),
    contentType: "audio/webm",
  });

  const { data } = await axios({
    method: "post",
    url: `${STT_SERVICE_URL}/asr`,
    data: formData,
    responseType: "text",
    headers: {
      ...formData.getHeaders(),
    },
  });

  return data;
};
