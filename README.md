FAQ API Documentation
1. Introduction
This document provides detailed instructions on how to set up and use the FAQ API. The FAQ API allows users to manage frequently asked questions (FAQs) in a multilingual environment. It includes features for creating, reading, updating, deleting, and retrieving FAQs with support for translations.
2. Installation
Follow the steps below to install and run the FAQ API:
1. Clone the repository: ```bash
git clone https://github.com/your-repository-url.git
cd faq-api
```
2. Install dependencies:
```bash
npm install
```
3. Set up the environment variables in a `.env` file:
```bash
DATABASE_URL=your-database-url
PORT=your-port
```
4. Run the application:
```bash
npm start
```
5. The API will now be running on the specified port.
3. API Usage
The FAQ API provides the following routes for interacting with the FAQs:
API Endpoints
GET /api/listFaq
This endpoint fetches all the FAQs in the system.
Request Example:
```bash
curl -X GET http://ec2-15-207-98-255.ap-south-1.compute.amazonaws.com:8000/api/listFaq
```
Response Example:
```json
[
  {
    "id": 1,
    "question": "What is the return policy?",
    "answer": "Our return policy is valid for 30 days.",
    "translations": {
      "en": {
        "question": "What is the return policy?",
        "answer": "Our return policy is valid for 30 days."
      },
      "es": {
        "question": "¿Cuál es la política de devoluciones?",
        "answer": "Nuestra política de devoluciones es válida por 30 días."
      }
    }
  }
]
```
POST /api/postFaq
This endpoint allows you to create a new FAQ.
Request Example:
```bash
curl -X POST http://ec2-15-207-98-255.ap-south-1.compute.amazonaws.com:8000/api/postFaq \ 
  -H "Content-Type: application/json" \ 
  -d '{
    "question": "What is your refund policy?",
    "answer": "We offer a full refund within 14 days.",
    "translations": {
      "en": {
        "question": "What is your refund policy?",
        "answer": "We offer a full refund within 14 days."
      },
      "fr": {
        "question": "Quelle est votre politique de remboursement?",
        "answer": "Nous offrons un remboursement complet sous 14 jours."
      }
    }
  }'
```
Response Example:
```json
{
  "message": "FAQ created successfully",
  "faq": {
    "id": 2,
    "question": "What is your refund policy?",
    "answer": "We offer a full refund within 14 days.",
    "translations": {
      "en": {
        "question": "What is your refund policy?",
        "answer": "We offer a full refund within 14 days."
      },
      "fr": {
        "question": "Quelle est votre politique de remboursement?",
        "answer": "Nous offrons un remboursement complet sous 14 jours."
      }
    }
  }
}
```

4. Contribution Guidelines
We welcome contributions to the FAQ API project! To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and write tests if necessary.
4. Ensure that your code adheres to the coding standards (PEP8 for Python, ESLint for JavaScript).
5. Submit a pull request with a description of your changes.
5. Code Quality & Linting
To maintain high code quality, we follow the below guidelines:
1. **Use ESLint for JavaScript**: Run `npm run lint` to check for any linting issues.
2. **Follow PEP8 for Python**: Ensure that your Python code follows the PEP8 style guide.
6. License
This project is licensed under the MIT License - see the LICENSE file for details.
