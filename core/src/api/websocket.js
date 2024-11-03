const socketUrl = 'ws://localhost:8000/ws/driver-status/'

let socket

const connectWebSocket = (onMessageReceived) => {
    socket = new WebSocket(socketUrl)

    socket.onopen = () => {
        console.log('WebSocket connected')
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        onMessageReceived(data)
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error)
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected')
    };
};

const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};

export { connectWebSocket, sendMessage };
