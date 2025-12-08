using ChatVideo.Domain.Models;

namespace ChatVideo.Application.DTOs;

public record CreateConversationDto(
    string InitiatorId,
    string RecipientId,
    Message message);
