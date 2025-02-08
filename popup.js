chrome.runtime.sendMessage({ action: "checkCurrentTab" }, (response) => {
  const messageDiv = document.getElementById('message');
  if (response.isUnsafe) {
    messageDiv.textContent = "⚠️ This site is flagged as unsafe!";
    messageDiv.className = 'warning';
  } else {
    messageDiv.textContent = "✅ This site is safe.";
  }
});