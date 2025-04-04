// Sample contacts data
const contacts = [
    { id: 1, name: 'John Doe', status: 'Online', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', status: 'Offline', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Mike Johnson', status: 'Online', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Sarah Williams', status: 'Away', image: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'David Brown', status: 'Online', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Emma Wilson', status: 'Online', image: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'James Taylor', status: 'Offline', image: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Sophia Chen', status: 'Online', image: 'https://i.pravatar.cc/150?img=8' }
];

// Sample messages data
const messages = {
    1: [
        { text: 'Hi there!', time: '10:30 AM', sent: true },
        { text: 'Hello! How are you?', time: '10:31 AM', sent: false }
    ],
    2: [
        { text: 'Hey!', time: '9:15 AM', sent: true }
    ]
};

// DOM Elements
const contactsList = document.querySelector('.contacts-list');
const chatMessages = document.querySelector('.chat-messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const contactName = document.querySelector('.contact-name');
const contactStatus = document.querySelector('.contact-status');
const contactImg = document.querySelector('.contact-img');

let currentContact = null;

// Initialize contacts list
function initializeContacts() {
    contactsList.innerHTML = contacts.map(contact => `
        <div class="contact-item" data-id="${contact.id}">
            <img src="${contact.image}" alt="${contact.name}" class="contact-img">
            <div class="contact-info">
                <h5 class="contact-name">${contact.name}</h5>
                <span class="contact-status">${contact.status}</span>
            </div>
        </div>
    `).join('');

    // Add click event listeners to contacts
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', () => selectContact(parseInt(item.dataset.id)));
    });
}

// Select a contact and display their chat
function selectContact(contactId) {
    currentContact = contacts.find(c => c.id === contactId);
    if (!currentContact) return;

    // Update chat header
    contactName.textContent = currentContact.name;
    contactStatus.textContent = currentContact.status;
    contactImg.src = currentContact.image;

    // Update active state in contacts list
    document.querySelectorAll('.contact-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.id) === contactId) {
            item.classList.add('active');
        }
    });

    // Display messages
    displayMessages(contactId);
}

// Display messages for the selected contact
function displayMessages(contactId) {
    const contactMessages = messages[contactId] || [];
    chatMessages.innerHTML = contactMessages.map(message => `
        <div class="message ${message.sent ? 'sent' : 'received'}">
            <div class="message-content">${message.text}</div>
            <div class="message-time">${message.time}</div>
        </div>
    `).join('');

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle message submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentContact) return;

    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Add new message
    const newMessage = {
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true
    };

    // Initialize messages array for contact if it doesn't exist
    if (!messages[currentContact.id]) {
        messages[currentContact.id] = [];
    }

    messages[currentContact.id].push(newMessage);

    // Display updated messages
    displayMessages(currentContact.id);

    // Clear input
    messageInput.value = '';

    // Simulate received message after 1 second
    setTimeout(() => {
        const receivedMessage = {
            text: 'Message received!',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: false
        };
        messages[currentContact.id].push(receivedMessage);
        displayMessages(currentContact.id);
    }, 1000);
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm)
    );

    contactsList.innerHTML = filteredContacts.map(contact => `
        <div class="contact-item" data-id="${contact.id}">
            <img src="${contact.image}" alt="${contact.name}" class="contact-img">
            <div class="contact-info">
                <h5 class="contact-name">${contact.name}</h5>
                <span class="contact-status">${contact.status}</span>
            </div>
        </div>
    `).join('');

    // Re-add click event listeners
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', () => selectContact(parseInt(item.dataset.id)));
    });
});

// Initialize the application
initializeContacts(); 