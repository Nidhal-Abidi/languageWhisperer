import fs from "node:fs";
import path from "path";
import { readdir } from "fs/promises";

import { Session } from "../schema/session.schema";
export const saveSessionData = (session_id: string, data: Session) => {
  // Save the data of the session into backend/audio/sessions/{session_id}/meta.json
  const sessionsDirPath = path.join(
    __dirname,
    "../../audio/sessions",
    session_id
  );

  try {
    // Create parent directories recursively if needed
    fs.mkdirSync(sessionsDirPath, { recursive: true });

    const metaPath = path.join(sessionsDirPath, "meta.json");

    fs.writeFileSync(metaPath, JSON.stringify(data, null, 2));
    console.log("Session Data has been saved!");
  } catch (error) {
    console.error("Error saving session data:", error);
    throw new Error("Failed to create session directory");
  }
};

export const getDirectories = async (sourceFolder: string) =>
  (await readdir(sourceFolder, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
