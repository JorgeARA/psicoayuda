document.addEventListener("DOMContentLoaded", function () {
    const loginDialog = document.getElementById("loginDialog");
    const chatWindow = document.getElementById("chatWindow");
    const nameInput = document.getElementById("name");
    const documentInput = document.getElementById("document");
    const loginButton = document.getElementById("loginButton");
    const cancelButton = document.getElementById("cancelButton");
    const userSpan = document.getElementById("user");
    const messageInput = document.getElementById("message");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatMessages");
    const logoutButton = document.getElementById("logoutButton");

    let currentUser = "";
    let currentResponseIndex = 0;

    function showLoginDialog() {
        loginDialog.style.display = "block";
        chatWindow.style.display = "none";
    }

    function hideLoginDialog() {
        const name = nameInput.value.trim();
        const documentNumber = documentInput.value.trim();
        if (name !== "" && documentNumber !== "") {
            currentUser = name;
            userSpan.textContent = `Usuario: ${currentUser}`;
            loginDialog.style.display = "none";
            chatWindow.style.display = "flex";

            // Mostrar la respuesta inicial
            showResponse();
        }
    }

    function showResponse() {
        const responses = getResponses();
        if (currentResponseIndex < responses.length) {
            const response = responses[currentResponseIndex];
            const messageElement = document.createElement("p");
            messageElement.textContent = `${response.role}: ${response.message}`;
            chatMessages.appendChild(messageElement);
            currentResponseIndex++;

            // Desplazarse automáticamente hacia abajo para mostrar la respuesta más reciente
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function getResponses() {
        const responses = [
            {
                "role": "Camila Molina",
                "message": "Hola, ¿en qué puedo ayudarte hoy? Por favor, cuéntame cuál es el motivo de tu consulta."
            }
            // Puedes agregar más respuestas aquí
        ];

        return responses;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== "") {
            const messageElement = document.createElement("p");
            messageElement.textContent = `${currentUser}: ${message}`;
            messageElement.classList.add("user-message");
            chatMessages.appendChild(messageElement);
            messageInput.value = "";

            // Desplazarse automáticamente hacia abajo para mostrar el mensaje más reciente
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Mostrar una respuesta después del mensaje del usuario
            showResponse();
        }
    }

    function logout() {
        // Realiza acciones de cierre de sesión aquí, si es necesario
        // Puedes redirigir a la página de inicio de sesión, por ejemplo.
        showLoginDialog();
    }

    loginButton.addEventListener("click", hideLoginDialog);
    cancelButton.addEventListener("click", showLoginDialog);
    sendMessageButton.addEventListener("click", sendMessage);
    logoutButton.addEventListener("click", logout);

    // Permitir enviar mensajes al presionar Enter
    messageInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    showLoginDialog();
});
