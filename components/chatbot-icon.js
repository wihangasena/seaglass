class ChatBotIcon extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: 1000;
                }
                .chatbot-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #53ABA9 0%, #04757B 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(83, 171, 169, 0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .chatbot-icon:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(83, 171, 169, 0.6);
                }
                .chat-window {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    width: 350px;
                    height: 450px;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                }
                .chat-header {
                    background-color: #2A5360;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top-left-radius: 1rem;
                    border-top-right-radius: 1rem;
                }
                .chat-messages {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .message {
                    max-width: 80%;
                    padding: 0.75rem 1rem;
                    border-radius: 1rem;
                    word-wrap: break-word;
                }
                .message.bot {
                    background-color: #EADBD4;
                    align-self: flex-start;
                    border-bottom-left-radius: 0.25rem;
                }
                .message.user {
                    background-color: #53ABA9;
                    color: white;
                    align-self: flex-end;
                    border-bottom-right-radius: 0.25rem;
                }
                .quick-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    padding: 1rem;
                    border-top: 1px solid #EADBD4;
                }
                .quick-action {
                    background-color: #EADBD4;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .quick-action:hover {
                    background-color: #53ABA9;
                    color: white;
                }
                .close-chat {
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .chat-window {
                        width: 300px;
                        height: 400px;
                    }
                }
            </style>
            <div class="chatbot-container">
                <div class="chatbot-icon" id="chatbotIcon">
                    <i data-feather="message-circle" class="text-white w-8 h-8"></i>
                </div>
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div>
                            <strong>Sea Glass Concierge</strong>
                            <p class="text-sm text-gray-300">How can I help you today?</p>
                        </div>
                        <div class="close-chat" id="closeChat">
                            <i data-feather="x" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot">
                            Hello! I'm your AI concierge. How may I assist with your stay?
                        </div>
                        <div class="message bot">
                            You can ask me about check-in times, room prices, or our facilities.
                        </div>
                    </div>
                    <div class="quick-actions" id="quickActions">
                        <div class="quick-action" data-question="What are the check-in times?">Check-in times</div>
                        <div class="quick-action" data-question="What's the Wi-Fi password?">Wi-Fi Password</div>
                        <div class="quick-action" data-question="What are the restaurant hours?">Restaurant Hours</div>
                        <div class="quick-action" data-question="How do I book a spa service?">Spa Services</div>
                    </div>
                </div>
            </div>
        `;

        const chatbotIcon = this.shadowRoot.getElementById('chatbotIcon');
        const chatWindow = this.shadowRoot.getElementById('chatWindow');
        const closeChat = this.shadowRoot.getElementById('closeChat');
        const chatMessages = this.shadowRoot.getElementById('chatMessages');
        const quickActions = this.shadowRoot.querySelectorAll('.quick-action');

        chatbotIcon.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            feather.replace();
        });

        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });

        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const question = action.getAttribute('data-question');
                
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.textContent = question;
                chatMessages.appendChild(userMessage);
                
                // Add bot response
                setTimeout(() => {
                    const botResponse = document.createElement('div');
                    botResponse.className = 'message bot';
                    botResponse.textContent = this.getBotResponse(question);
                    chatMessages.appendChild(botResponse);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 500);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        });

        // Replace initial feather icons
        setTimeout(() => {
            const featherIcons = this.shadowRoot.querySelectorAll('[data-feather]');
            featherIcons.forEach(icon => {
                const iconName = icon.getAttribute('data-feather');
                const svg = feather.icons[iconName].toSvg();
                icon.outerHTML = svg;
            });
        }, 100);
    }

    getBotResponse(question) {
        const responses = {
            "What are the check-in times?": "Check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in may be available upon request.",
            "What's the Wi-Fi password?": "Our Wi-Fi password is 'Seaglass2024' for guests. Premium high-speed Wi-Fi is available throughout the property.",
            "What are the restaurant hours?": "Our restaurant is open daily: Breakfast 7-11 AM, Lunch 12-3 PM, Dinner 6-10 PM. Weekend brunch is 10 AM - 2 PM.",
            "How do I book a spa service?": "You can book spa services through your dashboard or visit our spa reception. Our signature massage therapy is highly recommended!",
            "default": "Thank you for your question. Our front desk team will be happy to assist you with that. You can also call extension 0 from your room phone."
        };
        
        return responses[question] || responses["default"];
    }
}

customElements.define('chat-bot-icon', ChatBotIcon);