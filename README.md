# Language whisperer project

## Workflow

```mermaid

title Language Whisperer Workflow

participant Frontend
participant Backend

Frontend->Frontend: Form to choose params.

Frontend->Backend:POST /api/sessions {conversationLanguage, translationLanguage, languageProficiency, scenario}

Backend->>Backend: Generate session_id, save params into /sessions/{id}/meta.json

Backend->Frontend: Response to: POST /sessions {session_id, message, meta_path}

Frontend->Frontend:UI (TOP) -> scenario, target/trans language + record BTN

loop conversation
Frontend->>Backend: POST /api/sessions/{id}/interactions (audio)
        Backend->>Backend: Save to ./sessions/{id}/interactions/{N}/user.webm
        Backend->>STT: Transcribe audio
        STT->>Backend: Return text
        Backend->>LLM: Send text + context
        LLM->>Backend: Return response object
        Backend->>TTS: Generate assistant audio
        TTS->>Backend: Return audio
        Backend->>Backend: Save audio from TTS & save text for user and LLM (translation and transcription)
        Backend->>Frontend: {interaction_data, audio_urls}

end
```

## Running the project with docker while making changes:

    + `docker compose down -v && docker compose build && docker compose up`

## Inspect a certain docker container

    + `docker inspect --format='{{json .State.Health}}' <container-name>`
