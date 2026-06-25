// API Configuration
const API_ENDPOINTS = {
    any: 'https://official-joke-api.appspot.com/random_joke',
    general: 'https://official-joke-api.appspot.com/jokes/general/random',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
};

// State Management
let appState = {
    currentJoke: null,
    jokeCount: 0,
    favorites: [],
    shareCount: 0,
    currentJokeType: 'any'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    initializeApp();
    getJoke();
});

function initializeApp() {
    updateStats();
    displayFavorites();
}

// Local Storage Functions
function saveState() {
    localStorage.setItem('jokeAppState', JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem('jokeAppState');
    if (saved) {
        appState = JSON.parse(saved);
    }
}

// Get Joke from API
async function getJoke() {
    const jokeDisplay = document.getElementById('joke-display');
    const getJokeBtn = document.getElementById('get-joke-btn');
    
    // Show loading state
    jokeDisplay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading a funny joke for you...</p>
        </div>
    `;
    getJokeBtn.disabled = true;

    try {
        const endpoint = API_ENDPOINTS[appState.currentJokeType] || API_ENDPOINTS.any;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const jokeData = await response.json();
        
        // Handle different API response formats
        const joke = Array.isArray(jokeData) ? jokeData[0] : jokeData;
        
        appState.currentJoke = joke;
        appState.jokeCount++;
        
        displayJoke(joke);
        saveState();
        updateStats();
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeDisplay.innerHTML = `
            <div style="text-align: center;">
                <p style="font-size: 18px; color: #ff6b6b; margin-bottom: 15px;">😅 Oops! Couldn't load the joke</p>
                <p style="color: #999; font-size: 14px; margin-bottom: 15px;">Error: ${error.message}</p>
                <p style="color: #999; font-size: 13px;">Please check your internet connection and try again.</p>
            </div>
        `;
    } finally {
        getJokeBtn.disabled = false;
    }
}

// Display Joke
function displayJoke(joke) {
    const jokeDisplay = document.getElementById('joke-display');
    const isFavorite = appState.favorites.some(fav => 
        fav.setup === joke.setup && fav.punchline === joke.punchline
    );

    let jokeTypeLabel = joke.type ? joke.type.charAt(0).toUpperCase() + joke.type.slice(1) : 'Random';
    if (joke.type === 'knock-knock') {
        jokeTypeLabel = 'Knock Knock';
    }

    const heartIcon = isFavorite ? '❤️' : '🤍';
    
    jokeDisplay.innerHTML = `
        <div style="width: 100%;">
            <div class="joke-type-badge">${jokeTypeLabel}</div>
            <div class="joke-text">${joke.setup || joke.joke}</div>
            ${joke.punchline ? `<div class="punchline">${joke.punchline}</div>` : ''}
            <button class="favorite-btn ${isFavorite ? 'liked' : ''}" onclick="toggleFavorite()" title="Add to favorites">
                ${heartIcon}
            </button>
        </div>
    `;
}

// Toggle Favorite
function toggleFavorite() {
    if (!appState.currentJoke) return;

    const joke = appState.currentJoke;
    const index = appState.favorites.findIndex(fav => 
        fav.setup === joke.setup && fav.punchline === joke.punchline
    );

    if (index > -1) {
        // Remove from favorites
        appState.favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        // Add to favorites
        appState.favorites.push({
            setup: joke.setup || joke.joke,
            punchline: joke.punchline || '',
            type: joke.type || 'random',
            savedAt: new Date().toLocaleString()
        });
        showToast('Added to favorites! ⭐');
    }

    saveState();
    displayJoke(appState.currentJoke);
    displayFavorites();
    updateStats();
}

// Copy to Clipboard
function copyToClipboard() {
    if (!appState.currentJoke) return;

    const joke = appState.currentJoke;
    const text = joke.setup 
        ? `${joke.setup}\n\n${joke.punchline}`
        : joke.joke;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard! 📋');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

// Share Joke
function shareJoke() {
    if (!appState.currentJoke) return;

    const joke = appState.currentJoke;
    const text = joke.setup 
        ? `${joke.setup}\n\n${joke.punchline}`
        : joke.joke;

    if (navigator.share) {
        navigator.share({
            title: '😂 Funny Joke',
            text: text,
            url: window.location.href
        }).then(() => {
            appState.shareCount++;
            saveState();
            updateStats();
            showToast('Shared successfully!');
        }).catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Share error:', err);
            }
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            appState.shareCount++;
            saveState();
            updateStats();
            showToast('Copied to clipboard! Share from there.');
        });
    }
}

// Set Joke Type
function setJokeType(type) {
    appState.currentJokeType = type;
    saveState();

    // Update active button
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });

    getJoke();
}

// Display Favorites
function displayFavorites() {
    const container = document.getElementById('favorites-container');
    const clearBtn = document.getElementById('clear-favorites-btn');

    if (appState.favorites.length === 0) {
        container.innerHTML = '<p class="no-favorites">No favorite jokes yet. Click the heart icon to save your favorite jokes!</p>';
        clearBtn.style.display = 'none';
    } else {
        container.innerHTML = appState.favorites.map((fav, index) => `
            <div class="favorite-item">
                <button class="favorite-item-remove" onclick="removeFavorite(${index})" title="Remove">
                    ×
                </button>
                <div style="padding-right: 20px;">
                    <p><strong>${fav.setup}</strong></p>
                    ${fav.punchline ? `<p style="margin-top: 8px; color: #667eea; font-weight: 600;">${fav.punchline}</p>` : ''}
                    <p style="font-size: 12px; color: #999; margin-top: 8px;">${fav.type} • ${fav.savedAt}</p>
                </div>
            </div>
        `).join('');
        clearBtn.style.display = 'block';
    }
}

// Remove Favorite
function removeFavorite(index) {
    appState.favorites.splice(index, 1);
    saveState();
    displayFavorites();
    updateStats();
    showToast('Removed from favorites');
}

// Clear All Favorites
function clearFavorites() {
    if (confirm('Are you sure you want to clear all favorite jokes?')) {
        appState.favorites = [];
        saveState();
        displayFavorites();
        updateStats();
        showToast('All favorites cleared');
    }
}

// Update Stats
function updateStats() {
    document.getElementById('total-jokes').textContent = appState.jokeCount;
    document.getElementById('favorite-count').textContent = appState.favorites.length;
    document.getElementById('share-count').textContent = appState.shareCount;
    document.getElementById('joke-count').textContent = appState.jokeCount;
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// API Info Modal
function openApiInfo() {
    document.getElementById('api-info-modal').classList.add('active');
}

function closeApiInfo() {
    document.getElementById('api-info-modal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('api-info-modal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        getJoke();
    }
});