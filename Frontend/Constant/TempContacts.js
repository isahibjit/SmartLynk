import React, { useState } from 'react';

// Make sure you have DaisyUI configured in your tailwind.config.js
// and the DaisyUI CDN link or installation in your project.
// For example, in your index.html or App.js, you might have:
// import 'daisyui/dist/full.css'; // if installed via npm

export const contactsData = [
  {
    id: 1,
    name: 'Sarah',
    time: '10:30 AM',
    lastMessage: "Hey, how's it going?",
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: true,
  },
  {
    id: 2,
    name: 'Mark',
    time: '10:25 AM',
    lastMessage: "I'm on my way!",
    label: 'Romeo',
    labelColor: 'badge-success',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: false,
  },
  {
    id: 3,
    name: 'Group Chat',
    time: '10:20 AM',
    lastMessage: 'Sounds good, see you there.',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: true,
  },
  {
    id: 4,
    name: 'Emily',
    time: '10:15 AM',
    lastMessage: "I'll be there in 10 minutes.",
    label: 'Professional Employee',
    labelColor: 'badge-secondary',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: false,
  },
  {
    id: 5,
    name: 'David',
    time: '10:10 AM',
    lastMessage: "Let's meet at the usual spot.",
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: true,
  },
  {
    id: 6,
    name: 'Jessica',
    time: '10:05 AM',
    lastMessage: "I'm running a bit late.",
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: false,
  },
  {
    id: 7,
    name: 'Michael',
    time: '10:00 AM',
    lastMessage: "I'm already here.",
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: true,
  },
  {
    id: 8,
    name: 'Olivia',
    time: '9:55 AM',
    lastMessage: "I'm on my way.",
    label: 'Romeo',
    labelColor: 'badge-success',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: false,
  },
  {
    id: 9,
    name: 'Daniel',
    time: '9:50 AM',
    lastMessage: "I'm almost there.",
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: true,
  },
  {
    id: 10,
    name: 'Sophia',
    time: '9:45 AM',
    lastMessage: "I'm leaving now.",
    label: 'Professional Employee',
    labelColor: 'badge-secondary',
    avatar: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg', // Placeholder
    online: false,
  },
];