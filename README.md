# Salon FAQ Chatbot

A conversational FAQ chatbot for a fictional hair salon, built to demonstrate AI-assisted customer support through a web interface and an optional WhatsApp integration.

The project uses a React/Vite frontend, an Express backend, the Groq API for language-model responses, and the Meta WhatsApp Cloud API for WhatsApp messaging.

## Features

- Answers questions about salon services and illustrative starting prices using a predefined FAQ.
- Uses recent conversation history to interpret follow-up questions.
- Avoids confirming information that is not available in the FAQ, such as opening hours, address, and payment methods.
- Provides a WhatsApp contact link when human assistance or confirmation is needed.
- Supports a web chat interface and an optional WhatsApp messaging integration.
- Keeps API credentials in environment variables instead of frontend source code.
- Allows the web chatbot to run without WhatsApp credentials.
- Includes automated tests for FAQ data validation.

## Technology Stack

- **Frontend:** React and Vite
- **Backend:** Node.js and Express
- **AI:** Groq API (`openai/gpt-oss-20b`)
- **Messaging:** Meta WhatsApp Cloud API
- **Configuration:** dotenv
- **Testing:** Node.js built-in test runner

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
│   ├── faq.test.js
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
- Meta WhatsApp Cloud API credentials to enable and test WhatsApp messaging

## Getting Started

### 1. Install Frontend Dependencies

Open a terminal in the project directory and run:

```bash
cd client
npm install
```

### 2. Install Backend Dependencies

Open a separate terminal in the project directory and run:

```bash
cd server
npm install
```

### 3. Configure Environment Variables

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

Replace the example values with your own credentials. These values are placeholders, not working credentials.

**The `GROQ_API_KEY` is required for AI-powered chatbot responses.** The WhatsApp credentials are optional when running the web chatbot. To enable WhatsApp messaging, configure the required WhatsApp credentials with valid values.

Never commit `server/.env` or share its contents publicly.

### 4. Start the Backend

From the `server` directory, run:

```bash
npm start
```

The backend uses port `3000` by default.

Check the health endpoint:

```text
http://localhost:3000/api/health
```

A successful response indicates that the backend is running.

### 5. Start the Frontend

Open a separate terminal and navigate to the `client` directory:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

Keep both terminals running while testing the application.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Checks backend health |
| GET | `/api/faq` | Retrieves the predefined FAQ |
| POST | `/api/chat` | Sends a message to the chatbot |
| GET | `/webhook` | Handles WhatsApp webhook verification |
| POST | `/webhook` | Receives WhatsApp webhook events |

The `/api/chat` endpoint expects a JSON request containing a `message` field.

Example:

```json
{
  "message": "How much does a haircut cost?"
}
```

The actual response format depends on the backend implementation.

## WhatsApp Cloud API Setup

WhatsApp integration is optional. The web chatbot remains available when WhatsApp credentials are not configured.

To enable WhatsApp messaging:

1. Configure a Meta WhatsApp Business Platform application.
2. Obtain the required WhatsApp access token and phone number ID.
3. Set the WhatsApp environment variables in `server/.env`.
4. Configure a webhook callback URL that can be reached by Meta.
5. Use `/webhook` as the callback path.
6. Set the verification token to match `WHATSAPP_VERIFY_TOKEN`.
7. Subscribe to the appropriate WhatsApp message events in Meta.
8. Test message reception and replies using valid credentials.

For local testing, a tunnelling service can temporarily expose the backend to the internet. The callback URL may need updating when the tunnel URL changes.

When WhatsApp is not configured, the webhook verification endpoint returns HTTP 503, while the web chatbot remains available. This behavior was verified during local testing.

Never publish WhatsApp access tokens or private environment files.

## FAQ and Demo Data

The salon is fictional. All service prices are illustrative starting prices for demonstration purposes and are not verified commercial prices.

Opening hours, the salon address, and payment policies are intentionally not confirmed in the FAQ.

Replace the demo information with approved business information before using this chatbot for a real business.

## Testing

### Automated Tests

The backend includes automated tests for FAQ data validation.

From the `server` directory, run:

```bash
npm test
```

The current automated test suite checks that:

- The FAQ contains at least one entry.
- Every FAQ entry has a question and an answer.
- FAQ questions are unique.

The three automated FAQ tests passed during local verification.

These tests validate FAQ data; they do not provide complete coverage of the AI service, API endpoints, or WhatsApp integration.

### Manual Verification

The following checks were performed locally:

- Backend health endpoint returned a successful response.
- FAQ endpoint returned 15 entries.
- The chat endpoint answered a question about haircut pricing.
- The web chat returned a response for a question about unavailable opening hours without inventing a schedule.
- The backend started without WhatsApp credentials while keeping the web chatbot available.
- The WhatsApp webhook verification endpoint returned HTTP 503 when WhatsApp was not configured.
- The frontend production build completed successfully.

These results confirm the tested local behavior. They do not establish that the application has been deployed to production or that live WhatsApp messaging has been fully tested.

## Limitations

- WhatsApp conversation history is stored in server memory and is lost when the backend restarts.
- WhatsApp messaging requires valid Meta credentials and a reachable webhook.
- AI responses require a valid Groq API key and availability of the configured model.
- Prices and salon details are demo data and must be verified before real-world use.
- The automated tests currently focus on FAQ data validation.
- Production use would require additional security, privacy, monitoring, error-handling, and reliability review.

## Security

- Never commit `.env`, `server/.env`, API keys, or access tokens.
- Keep `.env.example` free of real credentials.
- Do not put private API keys in frontend code.
- Configure environment variables on the deployment platform when deploying the application.
- If a secret is accidentally published, revoke it and issue a replacement. Removing it from the latest version does not necessarily remove it from Git history.
- Review access controls, request validation, rate limiting, and logging before production use.

## Purpose

This project demonstrates practical skills in:

- Full-stack web development.
- REST API integration.
- Conversational AI using an LLM API.
- FAQ-based response control.
- WhatsApp Cloud API integration.
- Environment-based configuration.
- Automated testing and technical documentation.
