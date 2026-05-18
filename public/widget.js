(function() {
  // Prevent multiple initializations
  if (window.__saarthi_widget_initialized) return;
  window.__saarthi_widget_initialized = true;

  const settings = window.SaarthiDeskSettings || {};
  const widgetId = settings.widgetId;
  
  if (!widgetId) {
    console.error("SaarthiDesk Widget Error: 'widgetId' (Workspace ID) is missing in window.SaarthiDeskSettings");
    return;
  }

  const host = settings.apiHost || window.location.origin;
  const themeColor = settings.themeColor || "#7c3aed";
  const agentName = settings.agentName || "Saarthi AI";

  // Create stylesheet for basic widget wrapper rules
  const style = document.createElement("style");
  style.innerHTML = `
    .saarthi-widget-iframe-container {
      position: fixed !important;
      bottom: 95px !important;
      right: 20px !important;
      width: 380px !important;
      height: 600px !important;
      max-height: calc(100vh - 120px) !important;
      max-width: calc(100vw - 40px) !important;
      border-radius: 20px !important;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18) !important;
      z-index: 2147483647 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      overflow: hidden !important;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
      opacity: 0 !important;
      transform: translateY(20px) scale(0.95) !important;
      pointer-events: none !important;
      transform-origin: bottom right !important;
    }
    .saarthi-widget-iframe-container.open {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
      pointer-events: auto !important;
    }
    .saarthi-widget-button {
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 30px !important;
      border: none !important;
      cursor: pointer !important;
      z-index: 2147483647 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
      box-shadow: 0 6px 24px rgba(124, 58, 237, 0.3) !important;
    }
    .saarthi-widget-button:hover {
      transform: scale(1.08) !important;
      box-shadow: 0 8px 30px rgba(124, 58, 237, 0.45) !important;
    }
    .saarthi-widget-button:active {
      transform: scale(0.95) !important;
    }
    @media (max-width: 480px) {
      .saarthi-widget-iframe-container {
        bottom: 85px !important;
        right: 15px !important;
        width: calc(100vw - 30px) !important;
        height: calc(100vh - 110px) !important;
      }
      .saarthi-widget-button {
        bottom: 15px !important;
        right: 15px !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Container wrapper
  const container = document.createElement("div");
  container.className = "saarthi-widget-iframe-container";
  
  // Clean, high-performance sandbox iframe
  const iframe = document.createElement("iframe");
  iframe.src = `${host}/widget/chat?widgetId=${widgetId}&theme=${encodeURIComponent(themeColor)}&agentName=${encodeURIComponent(agentName)}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.display = "block";
  iframe.setAttribute("allow", "clipboard-read; clipboard-write");
  
  container.appendChild(iframe);
  document.body.appendChild(container);

  // Floating button
  const button = document.createElement("button");
  button.className = "saarthi-widget-button";
  button.style.backgroundColor = themeColor;
  button.style.boxShadow = `0 6px 24px ${themeColor}4D`; // 30% opacity hex padding
  
  // Lucide style chat icon
  const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  // Lucide style close icon
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  button.innerHTML = chatIcon;
  document.body.appendChild(button);

  let isOpen = false;
  button.addEventListener("click", function() {
    isOpen = !isOpen;
    if (isOpen) {
      container.classList.add("open");
      button.innerHTML = closeIcon;
      // Tell the iframe that it has opened
      try {
        iframe.contentWindow.postMessage({ type: "saarthi:widget-open" }, "*");
      } catch (e) {}
    } else {
      container.classList.remove("open");
      button.innerHTML = chatIcon;
    }
  });

  // Listener to receive custom actions from iframe if necessary (e.g. self-close)
  window.addEventListener("message", function(event) {
    if (event.data && event.data.type === "saarthi:widget-close") {
      isOpen = false;
      container.classList.remove("open");
      button.innerHTML = chatIcon;
    }
  });
})();
