# GUSTO Thadingyut Voting Website

A modern, secure, and interactive web application for the GUSTO Thadingyut Festival, enabling students and staff to vote for their favorite Kings, Queens, Lanterns, and participate in special events.

---

## 🎉 Features

- **User Authentication**: Secure login via Firebase (Google/email)
- **Voting System**: Vote for Kings, Queens, Lanterns, and more
- **Live Results**: Real-time voting results and winner pages
- **Responsive UI**: Mobile-first, beautiful Tailwind CSS design
- **Token-based Rewards**: Special event participation with token validation
- **Admin & Security**: Server-side session management, protected routes
- **MySQL Database**: Robust backend for candidate and vote storage

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Voting Website
   ```
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Set up environment variables**
   - Copy `.env.example` to `.env` and fill in your secrets (see below)
   - Place your `firebase-service-account.json` in the project root
4. **Run the app**
   ```bash
   python app.py
   ```
5. **Access the site**
   - Visit `http://localhost:5000` in your browser

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```
SECRET_KEY=your-secret-key
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
FIREBASE_CREDENTIALS_JSON={...}
```

---

## 📁 Project Structure

```
Voting Website/
├── app.py                  # Main Flask app
├── requirements.txt        # Python dependencies
├── firebase-service-account.json
├── static/                 # Static files (JS, CSS, images)
├── templates/              # Jinja2 HTML templates
├── .env                    # Environment variables
└── ...
```

---

## 🛡️ Security & Best Practices
- All voting and sensitive routes require authentication
- Tokens and votes are validated server-side
- Never commit secrets or credentials to version control

---

## 👨‍💻 Authors & Credits
- Developed by GUSTO Coding Club
- Special thanks to all contributors and the GUSTO community

---

## 📄 License
This project is for educational and festival use at GUSTO. See individual package licenses for dependencies.

---

**Happy Voting! 🗳️👑👸**
