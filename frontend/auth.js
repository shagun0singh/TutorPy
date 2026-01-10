// API endpoint
const API_BASE_URL = 'https://tutorpy-backend.vercel.app/api';

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('tutorpy_token');
    const currentPage = window.location.pathname;
    
    // If on chat page and not logged in, redirect to signin
    if (currentPage.includes('chat.html') && !token) {
        window.location.href = 'signin.html';
    }
    
    // If on auth pages and already logged in, redirect to chat
    if ((currentPage.includes('signin.html') || currentPage.includes('signup.html')) && token) {
        window.location.href = 'chat.html';
    }
}

// Run auth check on page load
checkAuth();

/**
 * Handle Sign Up
 */
if (document.getElementById('signupForm')) {
    const signupForm = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Hide previous messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        
        // Disable button
        signupBtn.disabled = true;
        signupBtn.textContent = 'Creating Account...';
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Store token
                localStorage.setItem('tutorpy_token', data.token);
                localStorage.setItem('tutorpy_user', JSON.stringify(data.user));
                
                // Show success message
                successMessage.textContent = 'Account created successfully! Redirecting...';
                successMessage.style.display = 'block';
                
                // Redirect to chat after 1 second
                setTimeout(() => {
                    window.location.href = 'chat.html';
                }, 1000);
                
            } else {
                // Show error message
                errorMessage.textContent = data.error || 'Failed to create account';
                errorMessage.style.display = 'block';
                signupBtn.disabled = false;
                signupBtn.textContent = 'Create Account';
            }
            
        } catch (error) {
            console.error('Signup error:', error);
            errorMessage.textContent = 'Network error. Please try again.';
            errorMessage.style.display = 'block';
            signupBtn.disabled = false;
            signupBtn.textContent = 'Create Account';
        }
    });
}

/**
 * Handle Sign In
 */
if (document.getElementById('signinForm')) {
    const signinForm = document.getElementById('signinForm');
    const signinBtn = document.getElementById('signinBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Hide previous messages
        errorMessage.style.display = 'none';
        
        // Disable button
        signinBtn.disabled = true;
        signinBtn.textContent = 'Signing In...';
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Store token
                localStorage.setItem('tutorpy_token', data.token);
                localStorage.setItem('tutorpy_user', JSON.stringify(data.user));
                
                // Redirect to chat
                window.location.href = 'chat.html';
                
            } else {
                // Show error message
                errorMessage.textContent = data.error || 'Failed to sign in';
                errorMessage.style.display = 'block';
                signinBtn.disabled = false;
                signinBtn.textContent = 'Sign In';
            }
            
        } catch (error) {
            console.error('Signin error:', error);
            errorMessage.textContent = 'Network error. Please try again.';
            errorMessage.style.display = 'block';
            signinBtn.disabled = false;
            signinBtn.textContent = 'Sign In';
        }
    });
}

/**
 * Logout function (used in chat.html)
 */
function logout() {
    localStorage.removeItem('tutorpy_token');
    localStorage.removeItem('tutorpy_user');
    window.location.href = 'index.html';
}

