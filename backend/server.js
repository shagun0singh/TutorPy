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
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Allow localhost for development
        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }
        
        // Allow all Vercel deployments (any subdomain of vercel.app)
        if (origin.includes('.vercel.app')) {
            return callback(null, true);
        }
        
        // Allow custom frontend URL if set
        if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
            return callback(null, true);
        }
        
        // Default: allow all origins (for now - can restrict later)
        callback(null, true);
    },
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
        const { message, history } = req.body;
        
        // Validate input
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Validate message is not empty after trimming
        if (message.trim().length === 0) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }
        
        console.log('📩 Received message:', message);
        const conversationHistory = Array.isArray(history) ? history : [];

        // Derive current problem from first user message in history or current message
        const firstUserMessage = conversationHistory.find(m => m && m.role === 'user');
        const problem =
            (firstUserMessage && typeof firstUserMessage.content === 'string' && firstUserMessage.content.trim()) ||
            message ||
            'Beginner Python practice exercise';

        // Estimate current hint level from past assistant messages containing the word "Hint"
        const previousHints = conversationHistory.filter(
            m => m && m.role === 'assistant' && typeof m.content === 'string' && /hint\s*\d*/i.test(m.content)
        );
        let level = Math.min(previousHints.length + 1, 4);

        // If user explicitly asks for next hint, bump level (but never above 4)
        const lowerMessage = message.toLowerCase();
        if (/\bnext hint\b/.test(lowerMessage) || /\banother hint\b/.test(lowerMessage)) {
            level = Math.min(level + 1, 4);
        }
        if (!level || Number.isNaN(level)) {
            level = 1;
        }
        
        // TutorPy system prompt - friendly hint-focused tutor
        const systemPrompt = `You are TutorPy, friendly Python coach. Current problem: ${problem} | Hint level: ${level}

Rules:
- ALWAYS give an actionable hint, NEVER ask the user to clarify or restate the problem.
- If the user's request is vague, assume they are a beginner working on a simple Python exercise and start from Hint Level 1.
- Remember the conversation context and build on previous hints and messages, do not restart from scratch.
- Use progressive hints. If the user says \"next hint\" or similar, move to the next hint level (but never beyond Level 4).
- If you see error messages, stack traces, or Pyodide runtime errors, focus your hint on debugging those errors.
- Keep a casual, encouraging tone. Prefer phrases like \"Cool! Try this approach...\" instead of formal questions.
- Respond in at most 4 short sentences.
- End every reply with exactly this sentence: \"Paste your code or say 'next hint'.\"`;
        
        let reply;
        
        // Get Groq client (lazy initialization - only when chat is called)
        const groq = getGroqClient();
        
        // Build Groq messages with conversation memory
        const groqMessages = [
            { role: "system", content: systemPrompt },
            // Map prior history into Groq format
            ...conversationHistory
                .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
                .map(m => ({
                    role: m.role === 'assistant' ? 'assistant' : 'user',
                    content: m.content,
                })),
            {
                role: "user",
                content: message,
            },
        ];

        // Call Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: groqMessages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 256,
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

