// Asynchronous function to send a script line by line to an editable text box on a web page
async function sendScript(waitTime = 100, messageCount = 100) {
    let message = prompt("Enter the message you want to send:");
    
    // Validate if the message is not empty or null
    while (!message) {
      message = prompt("Message cannot be empty. Please enter the message you want to send:");
    }

    // Get references to relevant DOM elements
    const main = document.querySelector("#main");
    const textarea = main.querySelector(`div[contenteditable="true"]`);
  
    // Check if an editable text box is present
    if (!textarea) {
      throw new Error("No open conversation");
    }
  
    try {
      // Iterate over each line of the script
      for (let i = 0; i < messageCount; i++) {
          // Focus on the editable text box
          textarea.focus();
          
          // Insert the message text into the text box
          document.execCommand("insertText", false, message);
    
          // Dispatch an input event on the text box
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
    
          // Wait for a specified time before continuing to the next message
          await new Promise((resolve) => setTimeout(resolve, waitTime));
    
          // Find the send message button on the page
          const sendButton =
            main.querySelector(`[data-testid="send"]`) ||
            main.querySelector(`[data-icon="send"]`);
    
          // Click the send message button
          sendButton.click();
    
          // Wait for a time before continuing to the next message
          await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
  
      // Return the total number of messages sent successfully
      return messageCount;
    } catch (error) {
      // Handle errors and print error messages to the console
      console.error(error);
      throw error;
    }
}

// Get the number of messages from the user
let messageCountInput = prompt("Enter the number of messages to send (leave blank for the default value of 100):");
let messageCount;
if (messageCountInput === null || messageCountInput.trim() === '') {
    messageCount = 100; // Default value
} else {
    messageCount = parseInt(messageCountInput);
}

// Call the sendScript function with the specified number of messages
sendScript(100, messageCount)
  .then((e) => console.log(`Script finished, ${e} messages sent`))
  .catch(console.error);
