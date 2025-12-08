namespace ChatVideo.Application.DTOs;

public record SendMessageDto(
    string ConversationId,
    string FromUserId,
    string ToUserId,
    string Content,
    string Timestamp);
