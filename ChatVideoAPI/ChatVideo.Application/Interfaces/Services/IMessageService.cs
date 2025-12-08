

using ChatVideo.Application.DTOs;
using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Interfaces.Services;

public interface IMessageService
{
    Task<IEnumerable<Message>> GetMessagesAsync(string conversationId);
    Task ProcessMessage(SendMessageDto request);
    Task<string> GetLatestMessageInDocument(string documentId);
    void SendMessageAsync(SendMessageDto sendMessage);
}
