

namespace ChatVideo.Application.DTOs;

public record ConversationsForDisplayDto(
    string Id,
    UserLoggedInDetails InitiatorUser,
    UserLoggedInDetails RecipientUser,
    DateTime CreatedAt,
    string LastestMessage
);
