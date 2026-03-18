# Database Setup Guide

## MongoDB Installation

### For Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Start MongoDB service or run `mongod` from command line

### For macOS (using Homebrew):
```bash
brew install mongodb-community
brew services start mongodb-community
```

### For Linux (Ubuntu/Debian):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Environment Variables

The backend is configured to use MongoDB with the following environment variables in `.env`:

```
MONGODB_URI=mongodb://localhost:27017/sunrise
```

For production, use MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sunrise
```

## Database Collections

The application creates the following collections:
- `properties` - Property listings
- `users` - User accounts
- `contacts` - Contact form submissions

## Testing the Connection

Once MongoDB is running, start the backend server:
```bash
cd backend
npm run dev
```

You should see: "MongoDB Connected: localhost" in the console.

## API Endpoints

- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create new property (admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/contact` - Get all contact submissions
- `POST /api/contact` - Submit contact form