import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "node:fs"
import multer from "multer";
import { getDirectories } from "./sessionUtils";

export const createNewInteractionsSubFolder = async (sessionId:string) => {
  const interactionsDirPath = path.join(
    __dirname,
    "../../audio/sessions",
    sessionId,
    "interactions"
  );
  await fs.promises.mkdir(interactionsDirPath, { recursive: true });

  const existingInteractions = await getDirectories(interactionsDirPath);

  let interactionsSubFolder = "";
  if (existingInteractions.length === 0) {
    // We have to create the first interactions subfolder called `1`
    interactionsSubFolder = path.join(interactionsDirPath, "1");
  } else {
    // We have to create the next interactions subfolder.
    const nextInteractionNumber =
      Number(existingInteractions[existingInteractions.length - 1]) + 1;

    interactionsSubFolder = path.join(
      interactionsDirPath,
      nextInteractionNumber.toString()
    );
  }

  await fs.promises.mkdir(interactionsSubFolder, { recursive: true });
  
  return interactionsSubFolder
}

export const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const interactionsSubFolder = await createNewInteractionsSubFolder(req.params.session_id)
    cb(null, interactionsSubFolder);
  },
  filename: (req, file, cb) => {
    cb(null, "user.webm");
  },
});

export const fileFilter = (req:Request, file:Express.Multer.File, cb:multer.FileFilterCallback) => {
  if (file.fieldname !== "userRecording") {
    return cb(new Error("Field name must be 'userRecording'"))
  }
  
  if (!['audio/webm', 'audio/mpeg'].includes(file.mimetype)) {
    return cb(new Error("File must be a WebM or MP3 audio recording"))
  }
  
  cb(null, true);
}

export const validateNewInteraction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the session_id exists
  const {
    params: { session_id },
  } = req;
  const sessionsDirPath = path.join(
    __dirname,
    "../../audio/sessions",
    session_id
  );
  if (!fs.existsSync(sessionsDirPath)) {
    res.status(404).send(`The requested session ${session_id} doesn't exist`);
    return 
  }

  next();
};