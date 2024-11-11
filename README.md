# Catch-Up
> *Welcome to the Catch-Up! This is a real-time, user-friendly chat platform designed to make online communication seamless and enjoyable. Whether you're looking to connect with friends, collaborate with teams, or engage with communities, this app provides a smooth experience with responsive design, customizable features, and reliable performance.*

---
### Features
- **Real-time Messaging**: Instant delivery of messages with typing indicators, read receipts, and notifications.
- **User Authentication**: Secure login and signup options with password encryption.
- **Customizable Profiles**: Users can add profile pictures, display names, and status messages.
- **Group and Private Chats**: Option to create group chats or have one-on-one private conversations.
- **Message Reactions and Emojis**: Express yourself with emojis and message reactions.
- **File Sharing**: Easily share images, files, and links within chats.
- **Responsive Design**: Works smoothly across desktop and mobile devices.

### Tech Stacks
- **Frontend**: [Next.JS](https://nextjs.org/)
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Real-time Communication**: [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Installation
##### Prerequisites

- **Node.js** 18.8.8 or later
- **MongoDB** 8.0 or later
- **Git**

##### Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/baolhq/catch-up.git
cd catch-up
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables. Create a `.env` file in the root directory with the following:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Start the server:
```bash
cd server
npm run dev
```
5. Start the client:
```bash
cd client
npm run dev
```
6. Open a browser and go to `http://localhost:3000` to start using the app.

### Usage
Once you've started the server, you can register a new account or log in with existing credentials. Here are some tips on using the application:

- **Creating a Group**: Head to the "Groups" tab and click "New Group" to start a group chat.
- **Direct Messages**: Click on a username from your contacts to start a private conversation.
- **Customization**: Access settings to update your profile and notification preferences.

## Contributing

We welcome contributions! If you'd like to help make the app even better, feel free to submit pull requests. Here’s how you can contribute:

1. Fork the repository.
2. Create a new branch with your feature or bug fix.
3. Commit your changes.
4. Push to your forked repository and create a pull request.

For further details, please refer to our [CODE_OF_CONDUCT](./CODE_OF_CONDUCT)

### License
This project is licensed under the [MIT](./LICENSE) License.