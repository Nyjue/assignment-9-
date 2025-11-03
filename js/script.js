const API_KEY = "sc4kkMZTIE6Ubu4zHKMH70XPhNMLw4Yt"; 
const BASE_URL = "https://api.giphy.com/v1/gifs";

const fetchBtn = document.getElementById('fetch-btn');
const gifContainer = document.getElementById('gif-container');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Giphy API Demo loaded successfully!');
    
    
    fetchBtn.addEventListener('click', handleFetchGifs);
});

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


async function fetchGifs() {
   
    const query = 'cats';
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


function displayGifs(images) {
   
    gifContainer.innerHTML = '';
    
    if (!images || images.length === 0) {
        showMessage('No GIFs found. Please try again.');
        return;
    }
    
 
    images.forEach(imageUrl => {
       
        const imageHTML = `<img src="${imageUrl}" class="col-3 mb-3 gif-image" alt="GIF">`;
        
       
        gifContainer.innerHTML += imageHTML;
    });
    
    console.log(`Displayed ${images.length} GIFs`);
}


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


function showError(message) {
    gifContainer.innerHTML = `
        <div class="alert alert-danger col-12" role="alert">
            <strong>Error:</strong> ${message}
        </div>
    `;
}


function showMessage(message) {
    gifContainer.innerHTML = `
        <div class="col-12 text-center text-muted">
            <p>${message}</p>
        </div>
    `;
}