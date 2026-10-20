# Salon FAQ Chatbot

A simple, AI-powered FAQ chatbot for a fictional hair salon. The project demonstrates conversational customer support through a web interface and WhatsApp, using Groq and the Meta WhatsApp Cloud API.

## Features

- Answers salon-related questions using a predefined FAQ.
- Provides consistent responses about services and illustrative starting prices.
- Uses conversation history to understand follow-up questions.
- Avoids inventing unavailable information, such as opening hours, address, and payment methods.
- Directs customers to the salon team when human assistance is needed.
- Supports a web chat interface and WhatsApp messaging.
- Keeps API credentials in environment variables rather than source code.

## Technology Stack

- **Frontend:** React and Vite
- **Backend:** Node.js and Express
- **AI:** Groq API
- **Messaging:** Meta WhatsApp Cloud API
- **Configuration:** Environment variables using dotenv

## Project Structure

```text
salon-faq-chatbot/
├── src/
│   └── App.jsx
├── server/
│   └── faq.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

The structure above is illustrative. Check the actual project files and adjust the paths if your local structure differs.

## Getting Started

### Prerequisites

- Node.js and npm
- A Groq API key
- A Meta developer account and WhatsApp Cloud API configuration for WhatsApp integration

### 1. Install dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

If the backend has a separate `package.json`, install its dependencies in the backend directory as well.

### 2. Configure environment variables

Create a local `.env` file using `.env.example` as a reference.

Add your own credentials and configuration values locally. Never commit `.env` or share API tokens publicly.

### 3. Start the application

Use the scripts defined in `package.json`. For example, if the project defines `dev` and `server` scripts, start the frontend and backend in separate terminals using those scripts.

The frontend and backend must both be running for the complete local experience.

### 4. Configure WhatsApp

To receive WhatsApp messages, configure the Meta WhatsApp Cloud API webhook to point to your publicly accessible backend URL.

Set the webhook callback URL and verification token in the Meta developer dashboard, subscribe to the appropriate WhatsApp messaging events, and configure the required environment variables.

For local development, a tunnelling service can expose the backend temporarily. Do not publish access tokens or private webhook configuration values.

## FAQ Behaviour

The chatbot uses a predefined FAQ as its source of truth. When information is unavailable, it should acknowledge the limitation and direct the user to the salon team instead of inventing details.

The demo tests include service and price questions, follow-up questions that depend on conversation history, unknown information, requests for human assistance, and attempts to override the FAQ.

## Demo Data Notice

This project uses a fictional salon. All service prices are illustrative starting prices created for demonstration purposes and are not verified commercial prices. Opening hours, location, and payment policies are intentionally not confirmed.

Replace the demo information with approved business information before using this project for a real salon.

## Security Notes

- Never commit `.env` or real API credentials.
- Keep `.env.example` free of secrets.
- Do not expose access tokens in frontend code, screenshots, logs, or documentation.
- Rotate any credential that is accidentally exposed.
- Use appropriate access controls and webhook verification for production deployments.

## Limitations

- Conversation history may be stored in memory and can be lost when the backend restarts.
- The WhatsApp integration requires valid Meta configuration and an accessible webhook.
- The demo FAQ and prices must be reviewed before real-world use.
- Production deployment requires additional monitoring, error handling, privacy review, and security hardening.

## Purpose

This project demonstrates practical skills in API integration, conversational AI, backend development, WhatsApp messaging, FAQ-based response control, and technical documentation.