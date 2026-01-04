async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const sendBtn = document.getElementById("sendBtn");

    if (input.value.trim() === "") return;
    sendBtn.disabled = true;

    const userQuestion = input.value;
    input.value = "";

    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typing";
    typingIndicator.innerText = "Typing...";
    chatBox.appendChild(typingIndicator);

    try {
        const API_URL = "https://college-admission-backend-vs2h.onrender.com";

        const res = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userQuestion
            })
        });

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();
        document.getElementById("typing").remove();

        const botMsg = document.createElement("div");
        botMsg.innerText = data.reply;
        chatBox.appendChild(botMsg);

    } catch (error) {
        if (document.getElementById("typing")) {
            document.getElementById("typing").remove();
        }
        chatBox.innerHTML += "<p>Unable to connect to server.</p>";
        console.error(error);
    }

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
