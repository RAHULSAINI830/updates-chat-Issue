var ChatbotWidget = (function() {
  function init(options) {
    var container = options.container || document.body;
    // Insert your widget HTML structure into the container.
    container.innerHTML = `
      <div class="chatbot-notification" id="chatbotNotification">
        Hey, how can I help you today?
      </div>
      <div class="chatbot-icon" onclick="ChatbotWidget.toggleChatbot()">💬</div>
      <div class="chatbot-window" id="chatbotWindow">
        <!-- Place your complete widget HTML structure here -->
      </div>
    `;
    // Inject your CSS
    var style = document.createElement('style');
    style.innerHTML = `/* Your CSS styles here */`;
    document.head.appendChild(style);
    // Initialize event listeners and functionality
    // (Include your JavaScript logic here)
  }
  
  function toggleChatbot() {
    var chatbotWindow = document.getElementById('chatbotWindow');
    var notification = document.getElementById('chatbotNotification');
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open')) {
      notification.style.display = 'none';
    } else {
      notification.style.display = 'block';
    }
  }
  
  // Expose public functions
  return {
    init: init,
    toggleChatbot: toggleChatbot
  };
})();
