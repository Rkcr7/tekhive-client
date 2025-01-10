# TekHive Client

## Overview
TekHive Client is the frontend component of the TekHive platform, a modern social networking application designed specifically for tech professionals. Built with Vue.js, this single-page application (SPA) provides an intuitive and responsive user interface for connecting with other tech professionals, real-time messaging, and profile management.

## Related Repositories
- Backend Server: [TekHive Server](https://github.com/Rkcr7/tekhive-server)

## Technology Stack
- **Framework**: Vue.js 3
- **State Management**: Vuex
- **Router**: Vue Router
- **UI Framework**: Vuetify
- **CSS Framework**: Tailwind CSS
- **HTTP Client**: Axios
- **Real-time Communication**: WebSocket (Socket.io-client)
- **Build Tool**: Vite

## Key Features
- **User Authentication**
  - Login/Register functionality
  - JWT-based authentication
  - Password recovery

- **Profile Management**
  - Professional profile creation
  - Skills and expertise listing
  - Profile picture upload
  - Experience and education details

- **Social Networking**
  - Connect with other tech professionals
  - Friend requests system
  - Network visualization
  - Professional recommendations

- **Real-time Chat**
  - Instant messaging
  - Online status indicators
  - Message history
  - Unread message notifications

- **Responsive Design**
  - Mobile-first approach
  - Cross-browser compatibility
  - Adaptive layouts

## Project Structure
```
tekhive-client/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable Vue components
│   ├── views/          # Page components
│   ├── store/          # Vuex state management
│   ├── router/         # Vue Router configuration
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   └── styles/         # Global styles
├── tests/              # Unit and E2E tests
└── vite.config.js      # Vite configuration
```

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser
- TekHive Server running locally or remotely

## Getting Started

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to project directory:
```bash
cd tekhive-client
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Create .env file:
```env
VITE_API_URL=http://localhost:8085
VITE_WS_URL=ws://localhost:8085
```

5. Start development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Build for Production
```bash
npm run build
# or
yarn build
```

## Environment Variables
- `VITE_API_URL`: Backend API URL
- `VITE_WS_URL`: WebSocket server URL
- `VITE_APP_TITLE`: Application title
- `VITE_GA_ID`: Google Analytics ID (optional)

## Features in Detail

### Authentication System
- Secure JWT token handling
- Persistent session management
- Role-based access control

### Profile Features
- Customizable user profiles
- Professional summary
- Skills endorsement system
- Portfolio showcase

### Networking Features
- Advanced user search
- Connection suggestions
- Professional networking tools
- Industry-specific networking

### Chat System
- Real-time messaging
- File sharing capabilities
- Emoji support
- Message read receipts
- Typing indicators

### UI/UX Features
- Dark/Light theme
- Customizable interface
- Intuitive navigation
- Loading states and animations
- Error handling and feedback

## Testing
- Unit tests with Jest
- E2E tests with Cypress
- Component testing with Vue Test Utils

## Performance Optimization
- Lazy loading of components
- Image optimization
- Code splitting
- Caching strategies

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Guidelines
- Follow Vue.js style guide
- Write meaningful commit messages
- Document new features
- Add appropriate tests
- Ensure responsive design

## Troubleshooting
Common issues and their solutions:
- WebSocket connection issues
- Authentication errors
- Build optimization problems
