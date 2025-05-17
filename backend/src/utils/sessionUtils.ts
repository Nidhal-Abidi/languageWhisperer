import fs from "node:fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { readdir } from "fs/promises";

import { Session, sessionSchema } from "../schema/session.schema.js";
import { Request, Response, NextFunction } from "express";

export const saveSessionData = (session_id: string, data: Session) => {
  // Save the data of the session into backend/audio/sessions/{session_id}/meta.json
  const __filename = fileURLToPath(import.meta.url);
  // Get the directory name from the file path
  const __dirname = dirname(__filename);
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
  } catch (error) {
    console.error("Error saving session data:", error);
    throw new Error("Failed to create session directory");
  }
};

export const validateNewSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = sessionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedNewSession = result.data;
  next();
};

export const getDirectories = async (sourceFolder: string) =>
  (await readdir(sourceFolder, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
