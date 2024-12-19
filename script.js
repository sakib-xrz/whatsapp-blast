async function enviarScriptRepeatedly(message, repeatCount, delay = 250) {
    const main = document.querySelector("#main");
    const textarea = main?.querySelector(`div[contenteditable="true"]`);
  
    if (!textarea) throw new Error("No open chat found");
  
    for (let i = 0; i < repeatCount; i++) {
      console.log(`Sending message #${i + 1}: ${message}`);
  
      // Focus the input box and insert the message
      textarea.focus();
      document.execCommand("insertText", false, message);
  
      // Dispatch a change event to simulate typing
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
  
      // Click the send button after a small delay
      setTimeout(() => {
        const sendButton =
          main.querySelector(`[data-testid="send"]`) ||
          main.querySelector(`[data-icon="send"]`);
  
        if (sendButton) sendButton.click();
      }, 100);
  
      // Wait for the specified delay before sending the next message
      if (i !== repeatCount - 1) await new Promise(resolve => setTimeout(resolve, delay));
    }
  
    console.log(`Successfully sent "${message}" ${repeatCount} times.`);
  }
  