```mermaid
graph TD;
    Client(React.js) -->|Request| Server(Node.js/Express.js);
    Server(Node.js/Express.js) -->|Call| GeminiAPI;
    GeminiAPI -->|Response| Server(Node.js/Express.js);
    Server(Node.js/Express.js) -->|Store| Database(MongoDB);
    Server(Node.js/Express.js) -->|Response| Client(React.js);
