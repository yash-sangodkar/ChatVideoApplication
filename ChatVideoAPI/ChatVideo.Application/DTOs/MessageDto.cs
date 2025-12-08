
namespace ChatVideo.Application.DTOs;

public record MessageDto(
    string FromUserId,
    string ToUserId,
    string Content,
    DateTime Timestamp);
