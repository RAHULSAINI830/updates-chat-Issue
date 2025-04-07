var ChatbotWidget = (function() {
  // Initialize the widget inside the provided container.
  function init(options) {
    var container = options.container || document.body;
    // Insert the widget HTML structure into the container.
    container.innerHTML = `
  <!-- Notification bubble -->
  <div class="chatbot-notification" id="chatbotNotification">
    Hey, how can I help you today?
  </div>
  <!-- Floating chat icon -->
  <div class="chatbot-icon" onclick="ChatbotWidget.toggleChatbot()">💬</div>
  <!-- Chat window -->
  <div class="chatbot-window" id="chatbotWindow">
    <div class="chatbot-header">
      <div class="bot-header-content">
        <img class="avatar" src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg" alt="Avatar">
        <div class="bot-text">
          <div class="bot-name">Zen Bot</div>
          <div class="bot-tagline">Your Virtual Assistance</div>
        </div>
      </div>
      <button class="maximize-button" onclick="toggleMaximize(event)">⛶</button>
    </div>
    <div class="chatbot-body">
      <!-- Global Search bar in main view -->
      <div class="search-container" id="globalSearchContainer">
        <div class="search-input-wrapper">
          <input type="text" id="searchBar" placeholder="Search..." />
          <span class="search-icon">&#128269;</span>
        </div>
      </div>
      <!-- Chatbot Options -->
      <div class="chatbot-options" id="chatbotOptions">
        <!-- Option 1: ZenTrades -->
        <div class="option-container" data-placeholder="Search ZenTrades">
          <button class="main-option">
            <span class="option-icon">🚀</span>
            <span class="option-text">Get started with ZenTrades (all verticals)</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch supademo</button>
            <button class="sub-option">Submit demo request</button>
            <button class="sub-option">Look to connect</button>
          </div>
        </div>
        <!-- Option 2: Forms -->
        <div class="option-container" data-placeholder="Search for forms">
          <button class="main-option">
            <span class="option-icon">📝</span>
            <span class="option-text">How to use our form builder</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch Video</button>
            <button class="sub-option">Contact with Support <span class="toggle-icon">►</span></button>
            <button class="sub-option">Look for forms</button>
          </div>
          <div class="resource-section forms-section">
            <h4>Popular Forms</h4>
            <div class="resource-list forms-list"></div>
          </div>
        </div>
        <!-- Option 3: Invoices -->
        <div class="option-container" data-placeholder="Search for invoices">
          <button class="main-option">
            <span class="option-icon">📄</span>
            <span class="option-text">How to use our invoice builder</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch Video</button>
            <button class="sub-option">Contact with Support <span class="toggle-icon">►</span></button>
            <button class="sub-option">Create invoices now</button>
          </div>
        </div>
        <!-- Option 4: Checklists -->
        <div class="option-container" data-placeholder="Search for checklists">
          <button class="main-option">
            <span class="option-icon">☑️</span>
            <span class="option-text">How to use our checklists</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch Video - how to download</button>
            <button class="sub-option">Contact with Support <span class="toggle-icon">►</span></button>
            <button class="sub-option">Look for checklists</button>
          </div>
          <div class="resource-section checklists-section">
            <h4>Popular Checklists</h4>
            <div class="resource-list checklists-list"></div>
          </div>
        </div>
        <!-- Option 5: Templates -->
        <div class="option-container" data-placeholder="Search for templates">
          <button class="main-option">
            <span class="option-icon">📑</span>
            <span class="option-text">How to use our templates</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch Video</button>
            <button class="sub-option">Contact with Support <span class="toggle-icon">►</span></button>
            <button class="sub-option">Look for templates</button>
          </div>
          <div class="resource-section templates-section">
            <h4>Popular Templates</h4>
            <div class="resource-list templates-list"></div>
          </div>
        </div>
        <!-- Option 6: Tools -->
        <div class="option-container" data-placeholder="Search for tools">
          <button class="main-option">
            <span class="option-icon">🛠️</span>
            <span class="option-text">How to use our tools</span>
            <span class="arrow">></span>
          </button>
          <div class="sub-options">
            <button class="back-button">&#8592;</button>
            <button class="sub-option">Watch Video</button>
            <button class="sub-option">Contact with Support <span class="toggle-icon">►</span></button>
            <button class="sub-option">Look for more Tools</button>
          </div>
          <div class="video-container">
            <button class="close-video" onclick="ChatbotWidget.closeVideo(event)">Close Video</button>
            <iframe src="https://www.youtube.com/embed/o99EznX3ABw?si=rNQ3IfO8C6t3lwOS" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="resource-section tools-section">
            <h4>Popular Tools</h4>
            <div class="resource-list tools-list"></div>
          </div>
        </div>
      </div>
      <!-- Search Tab (second tab) -->
      <div class="search-tab" id="searchTab">
        <button class="back-search" onclick="ChatbotWidget.closeSearchTab()">← Back</button>
        <h2 class="search-tab-title">Search Resources</h2>
        <div class="search-tab-header">
          <input type="text" id="searchTabInput" placeholder="Search..." />
        </div>
        <div id="searchResults"></div>
      </div>
    </div>
  </div>
    `;

    // Inject CSS styles exactly as in your original code.
    var style = document.createElement('style');
    style.innerHTML = `
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background: #f9f9f9;
}
/* Floating chat icon */
.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ee5566;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.chatbot-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
/* Notification bubble */
.chatbot-notification {
  position: fixed;
  bottom: 30px;
  right: 90px;
  background-color: #ee5566;
  color: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease;
  z-index: 999;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
/* Chat window container */
.chatbot-window {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 450px;
  height: 700px;
  background-color: #fff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease, width 0.4s ease,
    height 0.4s ease, bottom 0.4s ease, right 0.4s ease;
}
.chatbot-window.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.chatbot-window.maximized {
  width: 40%;
  height: 90%;
  bottom: 5%;
  right: 5%;
}
/* Chat window header */
.chatbot-header {
  background-color: #ee5566;
  color: #fff;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.bot-header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.bot-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.bot-name {
  font-size: 18px;
  font-weight: 500;
}
.bot-tagline {
  font-size: 12px;
  color: #f5f5f5;
}
.maximize-button {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s ease;
}
.maximize-button:hover {
  color: #f5f5f5;
}
/* Chat window body */
.chatbot-body {
  padding: 15px;
  height: calc(100% - 60px);
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  position: relative;
}
.chatbot-body::-webkit-scrollbar {
  width: 8px;
}
.chatbot-body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
/* Global Search bar (main view) */
.search-container {
  padding: 15px 15px 20px 0;
}
.search-input-wrapper {
  position: relative;
}
.search-input-wrapper input {
  width: 90%;
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
}
/* Options accordion styling */
.chatbot-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity 0.4s ease;
}
.option-container {
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
}
.main-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  background: #fff;
  border: none;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
}
.main-option:hover {
  background-color: #f6f6f6;
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.option-icon {
  margin-right: 10px;
  font-size: 20px;
}
.arrow {
  transition: transform 0.3s ease;
}
.arrow.rotated {
  transform: rotate(90deg);
}
/* Sub-options accordion */
.sub-options {
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
  background: #fafafa;
  transition: max-height 0.4s ease, opacity 0.4s ease;
  opacity: 0;
}
.sub-options.open {
  max-height: 300px;
  opacity: 1;
  padding-bottom: 15px;
}
.sub-option {
  padding: 10px 15px;
  font-size: 14px;
  color: #555;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  text-align: left;
}
.sub-option:hover {
  background-color: #f0f0f0;
  transform: translateX(5px);
}
.toggle-icon {
  margin-left: 5px;
}
/* Back button inside options */
.back-button {
  background: transparent;
  border: none;
  color: #ee5566;
  font-size: 18px;
  margin-bottom: 8px;
  cursor: pointer;
  text-align: left;
}
.back-button:hover {
  color: #cc4455;
}
/* Resource sections (for forms, templates, tools, checklists) */
.resource-section {
  display: none;
  background: #f0f4f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin: 15px 20px 20px;
  transition: max-height 0.4s ease, opacity 0.4s ease;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
}
.resource-section.open {
  display: block;
  max-height: 400px;
  opacity: 1;
}
.resource-section h4 {
  margin: 0 0 15px;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}
.resource-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.resource-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  flex: 1 1 calc(50% - 15px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.resource-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.resource-item a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  text-align: center;
  width: 100%;
}
/* Video Container with close button */
.video-container {
  display: none;
  margin: 15px 20px;
  position: relative;
}
.video-container.open {
  display: block;
}
.video-container iframe {
  width: 100%;
  height: 250px;
  border: none;
  border-radius: 8px;
}
.close-video {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ee5566;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  z-index: 11;
}
.close-video:hover {
  background: #cc4455;
}
/* Search Tab styling (second tab) */
.search-tab {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
  border-top: 2px solid #ee5566;
}
.search-tab.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.search-tab-title {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}
.search-tab-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.search-tab-header input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}
.back-search {
  background: transparent;
  border: none;
  color: #ee5566;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
}
.search-results-section {
  margin-bottom: 20px;
}
.search-results-section h4 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}
.search-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 16px;
  color: #333;
}
/* Support sub-options (for Contact with Support toggle) */
.support-suboptions {
  margin-top: 4px;
  padding: 8px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.support-suboptions.open {
  max-height: 100px;
  opacity: 1;
}
.support-option {
  font-size: 14px;
  color: #555;
}
.support-option a {
  text-decoration: none;
  color: #ee5566;
}
`;
    document.head.appendChild(style);

    // Attach event listeners after HTML is rendered.
    setTimeout(attachEventListeners, 100);
  }
window.toggleChatbot = toggleChatbot;

  // Toggle chat window open/close
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

  // Toggle maximized state of chat window
  function toggleMaximize(event) {
    event.stopPropagation();
    var chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.classList.toggle('maximized');
  }

  // Close search tab
  function closeSearchTab() {
    var searchTab = document.getElementById('searchTab');
    searchTab.classList.remove('open');
    document.getElementById('chatbotOptions').style.display = 'flex';
    document.getElementById('globalSearchContainer').style.display = 'block';
    document.getElementById('searchTabInput').value = '';
  }

  // Toggle support sub-options immediately after a "Contact with Support" button
  function toggleSupportSuboptions(subOption) {
    var supportSub = subOption.nextElementSibling;
    var toggleIcon = subOption.querySelector('.toggle-icon');
    if (supportSub && supportSub.classList.contains('support-suboptions')) {
      if (supportSub.classList.contains('open')) {
        supportSub.classList.remove('open');
        if (toggleIcon) toggleIcon.textContent = '►';
      } else {
        supportSub.classList.add('open');
        if (toggleIcon) toggleIcon.textContent = '▼';
      }
    } else {
      supportSub = document.createElement('div');
      supportSub.className = 'support-suboptions open';
      supportSub.innerHTML = `
        <div class="support-option"><a href="tel:2063070899">(206) 307-0899 – Existing Customer</a></div>
        <div class="support-option"><a href="https://zentrades.pro/book-demo" target="_blank">Book Demo</a></div>
      `;
      subOption.parentNode.insertBefore(supportSub, subOption.nextSibling);
      if (toggleIcon) toggleIcon.textContent = '▼';
    }
  }

  // Attach event listeners for interactive elements
  function attachEventListeners() {
    var optionContainers = document.querySelectorAll('.option-container');
    var optionsParent = document.getElementById('chatbotOptions');
    var searchBar = document.getElementById('searchBar');
    var searchTabInput = document.getElementById('searchTabInput');

    optionContainers.forEach(function(container) {
      var mainButton = container.querySelector('.main-option');
      var subOptions = container.querySelector('.sub-options');
      var arrow = mainButton.querySelector('.arrow');

      mainButton.addEventListener('click', function() {
        optionsParent.prepend(container);
        container.classList.add('active');
        optionContainers.forEach(function(otherContainer) {
          if (otherContainer !== container) otherContainer.classList.add('hidden');
        });
        var placeholder = container.getAttribute('data-placeholder');
        searchBar.setAttribute('placeholder', placeholder);
        if (placeholder.toLowerCase().includes('forms')) activeCategory = 'forms';
        else if (placeholder.toLowerCase().includes('templates')) activeCategory = 'templates';
        else if (placeholder.toLowerCase().includes('tools')) activeCategory = 'tools';
        else if (placeholder.toLowerCase().includes('checklists')) activeCategory = 'checklists';
        else activeCategory = null;
        subOptions.classList.add('open');
        arrow.classList.add('rotated');
        if (activeCategory === 'tools') {
          var toolsSection = container.querySelector('.tools-section');
          if (toolsSection) {
            toolsSection.classList.add('open');
            renderTools();
          }
        } else if (activeCategory === 'forms') {
          var formsSection = container.querySelector('.forms-section');
          if (formsSection) {
            formsSection.classList.add('open');
            renderForms();
          }
        } else if (activeCategory === 'templates') {
          var templatesSection = container.querySelector('.templates-section');
          if (templatesSection) {
            templatesSection.classList.add('open');
            renderTemplates();
          }
        } else if (activeCategory === 'checklists') {
          var checklistsSection = container.querySelector('.checklists-section');
          if (checklistsSection) {
            checklistsSection.classList.add('open');
            renderChecklists();
          }
        }
      });

      var backButton = container.querySelector('.back-button');
      if (backButton) {
        backButton.addEventListener('click', function(e) {
          e.stopPropagation();
          var subOptions = container.querySelector('.sub-options');
          subOptions.classList.remove('open');
          var arrow = container.querySelector('.arrow');
          arrow.classList.remove('rotated');
          container.classList.remove('active');
          var toolsSection = container.querySelector('.tools-section');
          if (toolsSection) toolsSection.classList.remove('open');
          var formsSection = container.querySelector('.forms-section');
          if (formsSection) formsSection.classList.remove('open');
          var templatesSection = container.querySelector('.templates-section');
          if (templatesSection) templatesSection.classList.remove('open');
          var checklistsSection = container.querySelector('.checklists-section');
          if (checklistsSection) checklistsSection.classList.remove('open');
          optionContainers.forEach(function(otherContainer) {
            otherContainer.classList.remove('hidden');
          });
          searchBar.setAttribute('placeholder', 'Search...');
          activeCategory = null;
        });
      }

      container.querySelectorAll('.sub-option').forEach(function(subOption) {
        var text = subOption.textContent.trim().toLowerCase();
        if (text.includes("look for")) {
          subOption.addEventListener('click', function(e) {
            e.stopPropagation();
            var placeholder = container.getAttribute('data-placeholder');
            if (placeholder.toLowerCase().includes('forms')) activeCategory = 'forms';
            else if (placeholder.toLowerCase().includes('templates')) activeCategory = 'templates';
            else if (placeholder.toLowerCase().includes('tools')) activeCategory = 'tools';
            else if (placeholder.toLowerCase().includes('checklists')) activeCategory = 'checklists';
            openSearchTab();
          });
        } else if (text.includes("contact with support")) {
          subOption.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSupportSuboptions(subOption);
          });
        }
      });

      if (container.getAttribute('data-placeholder').toLowerCase().includes('tools')) {
        var watchVideoButton = container.querySelectorAll('.sub-option')[0];
        if (watchVideoButton && watchVideoButton.textContent.trim().startsWith('Watch Video')) {
          watchVideoButton.addEventListener('click', function(e) {
            e.stopPropagation();
            subOptions.classList.remove('open');
            var videoContainer = container.querySelector('.video-container');
            videoContainer.classList.add('open');
          });
        }
      }
    });

    searchBar.addEventListener('click', openSearchTab);
    searchTabInput.addEventListener('input', function() {
      var query = searchTabInput.value.trim();
      if (activeCategory) filterAndRenderResults(activeCategory, query);
      else filterAndRenderResults(null, query);
    });
  }

  function openSearchTab() {
    var searchTab = document.getElementById('searchTab');
    searchTab.classList.add('open');
    document.getElementById('chatbotOptions').style.display = 'none';
    document.getElementById('globalSearchContainer').style.display = 'none';
    var searchTabInput = document.getElementById('searchTabInput');
    if (activeCategory) {
      renderCategoryResources(activeCategory);
      searchTabInput.setAttribute('placeholder', 'Search in ' + activeCategory + '...');
    } else {
      renderAggregatedResources();
      searchTabInput.setAttribute('placeholder', 'Search...');
    }
  }

  // Render functions
  function renderTools(query = '') {
    var activeContainer = document.querySelector('.option-container.active[data-placeholder*="tools"]');
    if (!activeContainer) return;
    var toolsListContainer = activeContainer.querySelector('.tools-section .resource-list.tools-list');
    var filtered = query.trim() !== '' ? tools.filter(function(tool) {
      return tool.name.toLowerCase().includes(query.toLowerCase());
    }) : tools.slice(0, 5);
    toolsListContainer.innerHTML = '';
    filtered.forEach(function(tool) {
      var div = document.createElement('div');
      div.className = 'resource-item';
      div.innerHTML = '<a href="' + tool.link + '" target="_blank">' + tool.name + '</a>';
      toolsListContainer.appendChild(div);
    });
  }
  function renderForms(query = '') {
    var activeContainer = document.querySelector('.option-container.active[data-placeholder*="forms"]');
    if (!activeContainer) return;
    var formsListContainer = activeContainer.querySelector('.forms-section .resource-list.forms-list');
    var filtered = query.trim() !== '' ? forms.filter(function(item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    }) : forms.slice(0, 5);
    formsListContainer.innerHTML = '';
    filtered.forEach(function(item) {
      var div = document.createElement('div');
      div.className = 'resource-item';
      div.innerHTML = '<a href="' + item.link + '" target="_blank">' + item.name + '</a>';
      formsListContainer.appendChild(div);
    });
  }
  function renderTemplates(query = '') {
    var activeContainer = document.querySelector('.option-container.active[data-placeholder*="templates"]');
    if (!activeContainer) return;
    var templatesListContainer = activeContainer.querySelector('.templates-section .resource-list.templates-list');
    var filtered = query.trim() !== '' ? templates.filter(function(item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    }) : templates.slice(0, 5);
    templatesListContainer.innerHTML = '';
    filtered.forEach(function(item) {
      var div = document.createElement('div');
      div.className = 'resource-item';
      div.innerHTML = '<a href="' + item.link + '" target="_blank">' + item.name + '</a>';
      templatesListContainer.appendChild(div);
    });
  }
  function renderChecklists(query = '') {
    var activeContainer = document.querySelector('.option-container.active[data-placeholder*="checklists"]');
    if (!activeContainer) return;
    var checklistsListContainer = activeContainer.querySelector('.checklists-section .resource-list.checklists-list');
    var filtered = query.trim() !== '' ? checklists.filter(function(item) {
      return item.name.toLowerCase().includes(query.toLowerCase());
    }) : checklists.slice(0, 5);
    checklistsListContainer.innerHTML = '';
    filtered.forEach(function(item) {
      var div = document.createElement('div');
      div.className = 'resource-item';
      div.innerHTML = '<a href="' + item.link + '" target="_blank">' + item.name + '</a>';
      checklistsListContainer.appendChild(div);
    });
  }
  function renderAggregatedResources() {
    var searchResults = document.getElementById('searchResults');
    var html = '';
    html += '<div class="search-results-section"><h4>Forms</h4>';
    forms.slice(0, 5).forEach(function(item) {
      html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
    });
    html += '</div>';
    html += '<div class="search-results-section"><h4>Templates</h4>';
    templates.slice(0, 5).forEach(function(item) {
      html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
    });
    html += '</div>';
    html += '<div class="search-results-section"><h4>Tools</h4>';
    tools.slice(0, 5).forEach(function(item) {
      html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
    });
    html += '</div>';
    html += '<div class="search-results-section"><h4>Checklists</h4>';
    checklists.slice(0, 5).forEach(function(item) {
      html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
    });
    html += '</div>';
    searchResults.innerHTML = html;
  }
  function renderCategoryResources(category) {
    var searchResults = document.getElementById('searchResults');
    var data = [];
    if (category === 'forms') data = forms;
    else if (category === 'templates') data = templates;
    else if (category === 'tools') data = tools;
    else if (category === 'checklists') data = checklists;
    var html = '<div class="search-results-section"><h4>' + category.charAt(0).toUpperCase() + category.slice(1) + '</h4>';
    data.slice(0, 5).forEach(function(item) {
      html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
    });
    html += '</div>';
    searchResults.innerHTML = html;
  }
  function filterAndRenderResults(category, query) {
    var searchResults = document.getElementById('searchResults');
    var html = '';
    if (category && (["forms", "templates", "tools", "checklists"].includes(category))) {
      var data = [];
      if (category === 'forms') data = forms;
      else if (category === 'templates') data = templates;
      else if (category === 'tools') data = tools;
      else if (category === 'checklists') data = checklists;
      var filtered = data.filter(function(item) {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      html += '<div class="search-results-section"><h4>' + category.charAt(0).toUpperCase() + category.slice(1) + '</h4>';
      if (filtered.length === 0) {
        html += '<div class="search-item">No results found.</div>';
      } else {
        filtered.forEach(function(item) {
          html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
        });
      }
      html += '</div>';
    } else {
      var aggregated = [];
      var allData = [
        ...forms.map(function(item) { return { ...item, category: 'Forms' }; }),
        ...templates.map(function(item) { return { ...item, category: 'Templates' }; }),
        ...tools.map(function(item) { return { ...item, category: 'Tools' }; }),
        ...checklists.map(function(item) { return { ...item, category: 'Checklists' }; })
      ];
      aggregated = allData.filter(function(item) {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      if (aggregated.length === 0) {
        html += '<div class="search-item">No results found.</div>';
      } else {
        var groups = {};
        aggregated.forEach(function(item) {
          if (!groups[item.category]) groups[item.category] = [];
          groups[item.category].push(item);
        });
        for (var group in groups) {
          html += '<div class="search-results-section"><h4>' + group + '</h4>';
          groups[group].forEach(function(item) {
            html += '<div class="search-item"><a href="' + item.link + '" target="_blank">' + item.name + '</a></div>';
          });
          html += '</div>';
        }
      }
    }
    searchResults.innerHTML = html;
  }

  // Attach event listeners after a slight delay to ensure HTML is rendered.
  setTimeout(attachEventListeners, 100);

  // Public API
  return {
    init: init,
    toggleChatbot: toggleChatbot,
    toggleMaximize: toggleMaximize,
    closeSearchTab: closeSearchTab,
    closeVideo: function(e) {
      e.stopPropagation();
      var videoContainer = e.target.closest('.video-container');
      if (videoContainer) videoContainer.classList.remove('open');
    }
  };
})();
