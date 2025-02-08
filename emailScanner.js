// emailScanner.js

/**
 * Scans email text for phishing indicators.
 * @param {string} text - Email body text.
 * @returns {boolean} - True if phishing indicators are found.
 */
function scanEmail(text) {
  // Normalize text to lowercase for case-insensitive checks
  const normalizedText = text.toLowerCase();

  // Common phishing keywords
  const phishingKeywords = [
    "password", "verify", "account", "urgent", "suspended",
    "login", "security", "click here", "confirm", "immediately"
  ];

  // Check for phishing keywords
  const hasPhishingKeyword = phishingKeywords.some(keyword => 
    normalizedText.includes(keyword)
  );

  // Check for suspicious links (non-HTTPS or mismatched domains)
  const suspiciousLinkRegex = /http:\/\/[^\s]+|https:\/\/[^\s]+/g;
  const links = normalizedText.match(suspiciousLinkRegex) || [];
  const hasSuspiciousLink = links.some(link => {
    try {
      const url = new URL(link);
      const isTrustedDomain = url.hostname.endsWith('trusted-domain.com'); // Replace with your trusted domains
      return !isTrustedDomain && !url.protocol.startsWith('https');
    } catch {
      return true; // Invalid URLs are flagged
    }
  });

  return hasPhishingKeyword || hasSuspiciousLink;
}

// Export for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scanEmail };
}