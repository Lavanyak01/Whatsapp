export function getSender(loggedUser, users) {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export function getSenderImg(loggedUser, users) {
  return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};

export function isSameSender(messages, m, i, userId) {
  return (
    i < messages.length - 1 &&  //check for last message
    (messages[i + 1].sender._id !== m.sender._id ||  //Next message not equal to sender
      messages[i + 1].sender._id === undefined) &&   //Checking if the next message is undefined or not
    messages[i].sender._id !== userId   //current message not equal to userId of other user
  );
};

export function isLastMessage(messages, i, userId) {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export function isSameSenderMargin(messages, m, i, userId) {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};