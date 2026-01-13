// import * as Ably from "ably";
// import {
//   ChatClient,
//   ConnectionStatusChange,
//   ChatMessageEvent,
//   RoomStatusChange,
// } from "@ably/chat";

// async function getStartedWithChat() {
//   // Create a new Ably Realtime client to connect to Ably with your key
//   // Note: in production, you should use tokens for authentication, rather than a key.
//   const ablyClient = new Ably.Realtime({
//     key: "b5FZXg.XdRcAA:0U1uSBMcyh4NBeT9jtqaIFzQztS8FunoTq9at8zmF3I",
//     clientId: "ably-chat",
//   });

//   // Create a new Ably Chat client, using the Ably client you created
//   // The same client can be re-used for as long as your application is running
//   const chatClient = new ChatClient(ablyClient);
//   const { off: unsubscribeConnectionStatus } =
//     chatClient.connection.onStatusChange((change: ConnectionStatusChange) => {
//       console.log("Connection state changed to", change.current);
//     });

//   // Get a room to join, subscribe to messages and then attach to the room
//   const room = await chatClient.rooms.get(
//     "getting-started"
//   );
//   const { off: unsubscribeRoomStatus } = room.onStatusChange(
//     (change: RoomStatusChange) => {
//       console.log("Room state changed to", change.current);
//     }
//   );

//   const { unsubscribe: messageUnsubscribe } = room.messages.subscribe(
//     (message: ChatMessageEvent) => {
//       console.log("Received message:", message.message.text);
//     }
//   );
//   await room.attach();

//   // Send our message to the room
//   await room.messages.send({
//     text: "Hello, World! This is my first message with Ably Chat!",
//   });

//   // After 5 seconds, release the room, remove our subscriptions and close the connection
//   setTimeout(async () => {
//     await chatClient.rooms.release(room.name);
//     messageUnsubscribe();
//     unsubscribeConnectionStatus();
//     unsubscribeRoomStatus();
//     ablyClient.close();
//   }, 5000);
// }

// getStartedWithChat().catch(console.error);