/*
 Import Node.js's built-in crypto module.

 crypto.randomUUID() will generate a unique ID
 for each chat message.
*/
import crypto from 'crypto';

/*
 In-memory data storage.

 This data exists only while the server is running.
 Restarting the server will delete all users and messages.
*/
export const store = {
    /*
     Store users in a Map.

     Key:
     username

     Value:
     {
         username,
         password
     }
    */
    users: new Map(),

    // Store all chat messages in an array.
    messages: []
};

export const userService = {
    /*
     Create and store a new user.
    */
    createUser: async (username, hashedPassword) => {
        // Do not allow duplicate usernames.
        if (store.users.has(username)) {
            throw new Error('Username already exists');
        }

        // Store the username and hashed password.
        store.users.set(username, {
            username,
            password: hashedPassword
        });

        // Return the user without exposing the password.
        return {
            username
        };
    },

    /*
     Find a user by username.
    */
    getUser: async (username) => {
        /*
         Map.get() returns the user when found
         and undefined when the user does not exist.
        */
        return store.users.get(username);
    }
};

export const messageService = {
    /*
     Create and store a new message.
    */
    addMessage: async (username, content) => {
        // Create the message in the required format.
        const message = {
            id: crypto.randomUUID(),
            username,
            content
        };

        // Add the message to the end of the array.
        store.messages.push(message);

        // Return the newly created message.
        return message;
    },

    /*
     Return all stored messages.
    */
    getMessages: async () => {
        return store.messages;
    },

    /*
     Find and delete one message by ID.
    */
    deleteMessage: async (messageId) => {
        // Find the position of the matching message.
        const index = store.messages.findIndex(
            (message) => message.id === messageId
        );

        // The message was not found.
        if (index === -1) {
            return false;
        }

        // Delete one message from the matching position.
        store.messages.splice(index, 1);

        return true;
    }
};