// API Configuration
// IMPORTANT: In a real application, this would be stored in environment variables
// For this educational exercise, we're including it directly
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual Giphy API key
const BASE_URL = "https://api.giphy.com/v1/gifs";

// DOM Elements
const fetchBtn = document.getElementById('fetch-btn');
const gifContainer = document.getElementById('gif-container');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Giphy API Demo loaded successfully!');
    
    // Attach event listener to the fetch button
    fetchBtn.addEventListener('click', handleFetchGifs);
});

// Main function to handle GIF fetching
async function handleFetchGifs() {
    try {
        // Show loading state
        showLoading();
        
        // Fetch GIFs from Giphy API
        const images = await fetchGifs();
        
        // Display GIFs on the page
        displayGifs(images);
        
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        showError('Failed to fetch GIFs. Please check your API key and try again.');
    }
}

// Function to fetch GIFs using async/await
async function fetchGifs() {
    // Using the search endpoint with a hardcoded query as specified in the assignment
    const query = 'cats'; // Hardcoded query as mentioned in Step 5
    const endpoint = `${BASE_URL}/search?api_key=${API_KEY}&q=${query}&limit=12&rating=g`;
    
    console.log('Fetching from endpoint:', endpoint);
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Extract the original image URLs from the response
    const images = data.data.map(gif => gif.images.original.url);
    console.log('Extracted image URLs:', images);
    
    return images;
}

// Function to display GIFs in the container
function displayGifs(images) {
    // Clear previous content
    gifContainer.innerHTML = '';
    
    if (!images || images.length === 0) {
        showMessage('No GIFs found. Please try again.');
        return;
    }
    
    // Iterate through the images array and create image elements
    images.forEach(imageUrl => {
        // Create the HTML string for each image
        const imageHTML = `<img src="${imageUrl}" class="col-3 mb-3 gif-image" alt="GIF">`;
        
        // Add the image to the container using innerHTML and += operator
        gifContainer.innerHTML += imageHTML;
    });
    
    console.log(`Displayed ${images.length} GIFs`);
}

// Helper function to show loading state
function showLoading() {
    gifContainer.innerHTML = `
        <div class="loading col-12">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Fetching GIFs from Giphy...</p>
        </div>
    `;
}

// Helper function to show error message
function showError(message) {
    gifContainer.innerHTML = `
        <div class="alert alert-danger col-12" role="alert">
            <strong>Error:</strong> ${message}
        </div>
    `;
}

// Helper function to show informational message
function showMessage(message) {
    gifContainer.innerHTML = `
        <div class="col-12 text-center text-muted">
            <p>${message}</p>
        </div>
    `;
}