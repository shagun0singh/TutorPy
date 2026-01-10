// DOM elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const loginModal = document.getElementById('loginModal');

// API endpoint
const API_URL = 'https://tutorpy-backend.vercel.app/api/chat';

// Check if user has used their free message
const FREE_MESSAGE_KEY = 'tutorpy_free_message_used';
let hasUsedFreeMessage = localStorage.getItem(FREE_MESSAGE_KEY) === 'true';

// Initialize event listeners
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

/**
 * Handle sending a user message
 */
async function handleSendMessage() {
    const message = userInput.value.trim();
    
    // Don't send empty messages
    if (!message) return;
    
    // Check if user has already used their free message
    if (hasUsedFreeMessage) {
        showLoginModal();
        return;
    }
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Disable send button while processing
    sendButton.disabled = true;
    
    // Show thinking indicator
    const thinkingId = showThinkingIndicator();
    
    try {
        // Send message to backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }
        
        const data = await response.json();
        
        // Remove thinking indicator
        removeThinkingIndicator(thinkingId);
        
        // Add AI response to chat
        addMessage(data.response, 'ai');
        
        // Mark free message as used
        localStorage.setItem(FREE_MESSAGE_KEY, 'true');
        hasUsedFreeMessage = true;
        
        // Show a message encouraging signup
        setTimeout(() => {
            addMessage('💡 Want to continue learning? Sign up for free to ask unlimited questions!', 'ai');
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        removeThinkingIndicator(thinkingId);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    } finally {
        // Re-enable send button
        sendButton.disabled = false;
        
        // If free message was used, update placeholder
        if (hasUsedFreeMessage) {
            userInput.placeholder = 'Sign up to continue asking questions...';
        } else {
            userInput.focus();
        }
    }
}

/**
 * Show login modal
 */
function showLoginModal() {
    loginModal.style.display = 'flex';
}

/**
 * Add a message to the chat container
 * @param {string} text - The message text
 * @param {string} type - Either 'user' or 'ai'
 */
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Split text by newlines and create paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentDiv.appendChild(p);
    });
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Show a thinking indicator while waiting for AI response
 * @returns {string} The ID of the thinking indicator element
 */
function showThinkingIndicator() {
    const thinkingId = 'thinking-' + Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.id = thinkingId;
    messageDiv.className = 'message ai-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking-indicator';
    thinkingDiv.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(thinkingDiv);
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return thinkingId;
}

/**
 * Remove the thinking indicator
 * @param {string} thinkingId - The ID of the thinking indicator element
 */
function removeThinkingIndicator(thinkingId) {
    const element = document.getElementById(thinkingId);
    if (element) {
        element.remove();
    }
}

