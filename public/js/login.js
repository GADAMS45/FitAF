// Define an asynchronous function to fetch data from an API
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data'); // Send a GET request to the API
    const data = await response.json(); // Parse the JSON response
    // Process and display the data on the page
  } catch (error) {
    console.error('Error fetching data: ', error); // Handle errors if the fetch or parsing fails
  }
}

// Call the fetchData function to initiate the data fetching process
fetchData();