let sessionId = localStorage.getItem("session_id");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("session_id", sessionId);
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const sendBtn = document.getElementById("sendBtn");

    if (input.value.trim() === "") return;

    sendBtn.disabled = true;

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerHTML = `
        <div class="avatar">👤</div>
        <div class="msg-content">
            <strong>You</strong>
            <p>${escapeHtml(input.value)}</p>
        </div>
    `;
    chatBox.appendChild(userMsg);

    const userQuestion = input.value;
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const typingIndicator = document.createElement("div");
    typingIndicator.className = "bot-msg typing-indicator";
    typingIndicator.id = "typing";
    typingIndicator.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="msg-content">
            <p>Typing...</p>
        </div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const API_URL = "https://college-admission-backend-vs2h.onrender.com";
        const res = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_id: sessionId,
                message: userQuestion
            })
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();

        const typingEl = document.getElementById("typing");
        if (typingEl) typingEl.remove();

        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="msg-content">
                <strong>College Guidance AI</strong>
                <p>${escapeHtml(data.reply)}</p>
            </div>
        `;
        chatBox.appendChild(botMsg);

    } catch (error) {
        console.error(error);

        const typingEl = document.getElementById("typing");
        if (typingEl) typingEl.remove();

        const errorMsg = document.createElement("div");
        errorMsg.className = "bot-msg";
        errorMsg.innerHTML = `
            <div class="avatar">⚠️</div>
            <div class="msg-content">
                <strong>Error</strong>
                <p>Unable to connect to server. Please try again.</p>
            </div>
        `;
        chatBox.appendChild(errorMsg);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    sendBtn.disabled = false;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

window.addEventListener("load", () => {
    document.getElementById("userInput").focus();
});
