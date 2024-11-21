document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (!username) {
      window.location.href = '/login';
      return;
    }
  
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('message');
  
    // Fetch messages
    async function fetchMessages() {
      const response = await fetch('/messages');
      const messages = await response.json();
      messagesDiv.innerHTML = messages.map(msg => `
        <p><strong>${msg.username}</strong>: ${msg.message}</p>
      `).join('');
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  
    // Send message
    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (message) {
        await fetch('/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, message })
        });
        messageInput.value = '';
        fetchMessages();
      }
    });
  
    // Poll messages every 2 seconds
    fetchMessages();
    setInterval(fetchMessages, 2000);
  });
  