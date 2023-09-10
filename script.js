document.addEventListener('DOMContentLoaded', function () {
    const fetchDataButton = document.getElementById('fetchData');
    const getCapabilitiesInput = document.getElementById('getCapabilitiesURL');
    const layerInfoContainer = document.getElementById('layerInfo');

    fetchDataButton.addEventListener('click', function () {
        const getCapabilitiesURL = getCapabilitiesInput.value;
        if (getCapabilitiesURL) {
            // Create a new XMLHttpRequest object
            const xhr = new XMLHttpRequest();

            // Configure the request
            xhr.open('GET', getCapabilitiesURL, true);

            // Define a function to handle the response
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Parse the XML response
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');

                    // Extract layer information
                    const layers = xmlDoc.querySelectorAll('Layer');

                    let layerInfoHTML = '';

                    layers.forEach((layer) => {
                        const idElement = layer.querySelector('Name');
                        const nameElement = layer.querySelector('Title');
                        const titleElement = layer.querySelector('Name');
                        const abstractElement = layer.querySelector('Abstract');

                        // Check if the elements exist before accessing textContent
                        const id = idElement ? idElement.textContent : 'N/A';
                        const name = nameElement ? nameElement.textContent : 'N/A';
                        const title = titleElement ? titleElement.textContent : 'N/A';
                        const abstract = abstractElement ? abstractElement.textContent : 'N/A';

                        // Add the layer information to the HTML
                        layerInfoHTML += `
                            <div>
                                <h2>Layer ID: ${id}</h2>
                                <p>Layer Name: ${name}</p>
                                <p>Layer Title: ${title}</p>
                                <p>Layer Abstract: ${abstract}</p>
                            </div>
                        `;
                    });

                    // Display the layer information
                    layerInfoContainer.innerHTML = layerInfoHTML;
                } else {
                    console.error('Failed to retrieve GetCapabilities');
                    layerInfoContainer.innerHTML = '<p>Error: Failed to retrieve GetCapabilities.</p>';
                }
            };

            // Handle network errors
            xhr.onerror = function () {
                console.error('Network error occurred');
                layerInfoContainer.innerHTML = '<p>Error: Network error occurred.</p>';
            };

            // Send the request
            xhr.send();
        } else {
            layerInfoContainer.innerHTML = '<p>Please enter a GetCapabilities URL.</p>';
        }
    });
});
