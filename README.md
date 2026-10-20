# Salon FAQ Chatbot

A conversational FAQ chatbot for a fictional hair salon, built to demonstrate AI-assisted customer support through a web interface and WhatsApp.

The project uses a React/Vite frontend, an Express backend, the Groq API for language-model responses, and the Meta WhatsApp Cloud API for WhatsApp messaging.

## Features

- Answers questions about salon services and illustrative starting prices using a predefined FAQ.
- Uses recent conversation history to interpret follow-up questions.
- Avoids confirming information that is not available in the FAQ, such as opening hours, address, and payment methods.
- Provides a WhatsApp contact link when human assistance or confirmation is needed.
- Supports a web chat interface and WhatsApp messaging.
- Keeps API credentials in environment variables instead of frontend source code.

## Technology Stack

- **Frontend:** React and Vite
- **Backend:** Node.js and Express
- **AI:** Groq API (`openai/gpt-oss-20b`)
- **Messaging:** Meta WhatsApp Cloud API
- **Configuration:** dotenv

## Project Structure

```text
salon-faq-chatbot/
├── client/
│   ├── src/
│   ├── package.json
│   ├── README.md
│   └── ...
├── server/
│   ├── faq.js
│   ├── server.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Requirements

- Node.js 22 or later recommended
- npm
- A Groq API key
- Meta WhatsApp Cloud API credentials to test WhatsApp integration

## Getting Started

### 1. Install frontend dependencies

Open a terminal in the project directory:

```bash
cd client
npm install
```

### 2. Install backend dependencies

Open another terminal in the project directory:

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a private file named `.env` inside the `server` directory.

Use the variable names from the root `.env.example` file:

```dotenv
PORT=3000
GROQ_API_KEY=your_groq_api_key
WHATSAPP_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_custom_verification_token
WHATSAPP_GRAPH_API_VERSION=v25.0
```

Replace the example values with your own credentials. These examples are placeholders, not working credentials.

**Never commit `server/.env` or share its contents publicly.** The current backend validates the WhatsApp variables during startup, even if you only want to test the web chat.

### 4. Start the backend

From the `server` directory, run:

```bash
npm start
```

The backend uses port `3000` by default.

Health check:

`http://localhost:3000/api/health`

### 5. Start the frontend

In a separate terminal, from the `client` directory, run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

`http://localhost:5173`

Keep both terminals running while testing the application.

## WhatsApp Cloud API Setup

To receive WhatsApp messages, configure a Meta webhook that can reach the backend.

- Webhook callback path: `/webhook`
- Verification token: the value configured in `WHATSAPP_VERIFY_TOKEN`
- Subscribe to the appropriate WhatsApp message events in Meta.
- Ensure the backend is publicly reachable for webhook delivery.

For local testing, a tunnelling service can expose the backend temporarily. The tunnel URL may change, so the callback URL may need updating.

Never publish WhatsApp access tokens or private environment files.

## FAQ and Demo Data

The salon is fictional. All service prices are illustrative starting prices for demonstration purposes and are not verified commercial prices.

Opening hours, the salon address, and payment policies are intentionally not confirmed in the FAQ.

Replace the demo information with approved business information before using this chatbot for a real business.

## Testing

Manual WhatsApp tests have covered:

- Questions about listed services and illustrative prices.
- Follow-up questions that refer to a previously mentioned service.
- Requests for unavailable details, including opening hours and payment methods.
- Requests to speak to a person.
- Questions outside the salon's scope.
- Attempts to override the FAQ with unsupported information.

These are manual demonstration tests, not a comprehensive automated test suite.

## Limitations

- WhatsApp conversation history is stored in server memory and is lost when the backend restarts.
- WhatsApp integration requires valid Meta credentials and a reachable webhook.
- Prices and salon details are demo data and must be verified before real-world use.
- Production use would require additional security, privacy, monitoring, and reliability review.

## Security

- Never commit `.env`, `server/.env`, API keys, or access tokens.
- Keep `.env.example` free of real credentials.
- Do not put private API keys in frontend code.
- If a secret is accidentally published, revoke it and issue a replacement. Removing it from the latest version does not necessarily remove it from Git history.

## Purpose

This project demonstrates practical skills in API integration, conversational AI, backend development, WhatsApp messaging, FAQ-based response control, and technical documentation.