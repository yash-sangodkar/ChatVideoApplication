

using ChatVideo.Application.DTOs;
using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Interfaces.Services;

public interface IConversationService
{
    Task<ICollection<Conversation>> GetAllConversations();
    Task<ConversationsForDisplayDto> CreateConversation(CreateConversationDto conversation);
    Task<ICollection<ConversationsForDisplayDto>> GetConversationsByUserId(string userId);
}
