require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Lazy-load Groq client (only create when needed, not at module level)
function getGroqClient() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error('GROQ_API_KEY environment variable is required. Please set it in Railway environment variables.');
    }
    return new Groq({ apiKey });
}

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration - allow frontend from Vercel and localhost
app.use(cors({
    origin: [
        'http://localhost:3000', // Local development
        'https://*.vercel.app', // All Vercel deployments
        process.env.FRONTEND_URL // Custom frontend URL if set
    ].filter(Boolean), // Remove undefined values
    credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login)

/**
 * Chat endpoint with Groq AI integration
 * POST /api/chat
 * Body: { "message": "user message" }
 * Response: { "reply": "AI response" }
 */
app.post('/api/chat', auth, async (req, res) => {
    try {
        const { message } = req.body;
        
        // Validate input
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Validate message is not empty after trimming
        if (message.trim().length === 0) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }
        
        console.log('📩 Received message:', message);
        
        // TutorPy system prompt
        const systemPrompt = `You are TutorPy, an AI coding tutor.
Your job is to help users THINK, not solve problems.
Support only Python.
First decide if the problem statement is clear.
If unclear, ask concise clarifying questions about input, output, or constraints.
If clear, respond with:
'✅ Thinking mode'
followed by a short explanation of how to approach the problem step by step.
Do not provide code.
Do not provide full algorithms.
Keep responses concise and encouraging (max 4–5 sentences).`;
        
        // Combine system prompt with user message
        const fullPrompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`;
        
        let reply;
        
        // Get Groq client (lazy initialization - only when chat is called)
        const groq = getGroqClient();
        
        // Call Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 200,
        });
        
        // Extract AI response
        reply = chatCompletion.choices[0].message.content;
        
        console.log('✅ AI reply generated');
        
        // Return response
        res.json({ reply });
        
    } catch (error) {
        console.error('❌ Error processing message:', error.message);
        
        // Handle Groq API errors
        if (error.message && error.message.includes('API key')) {
            return res.status(500).json({ 
                error: 'Groq API key configuration error.' 
            });
        }
        
        if (error.message && error.message.includes('rate limit')) {
            return res.status(503).json({ 
                error: 'API quota exceeded. Please try again later.' 
            });
        }
        
        // Generic error
        res.status(500).json({ 
            error: 'Failed to generate response. Please try again.' 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', mongodb: 'connected' });
});

// Test Gemini API endpoint
app.get('/test-gemini', async (req, res) => {
    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`;
        const response = await axios.get(apiUrl);
        res.json({ 
            status: 'success', 
            models: response.data.models.map(m => m.name) 
        });
    } catch (error) {
        res.json({ 
            status: 'error', 
            error: error.response?.data || error.message 
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'TutorPy API',
        endpoints: {
            signup: 'POST /api/auth/signup',
            login: 'POST /api/auth/login',
            chat: 'POST /api/chat (requires auth)',
            health: 'GET /health'
        }
    });
});

// Start server (only in local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 TutorPy backend running on http://localhost:${PORT}`);
    });
}

// Export app for Vercel serverless functions
module.exports = app;

