using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Interfaces.Repositories;

public interface IMessagesRepository
{
    Task<List<Message>> GetMessagesByDocumentIdAsync(string documentId);
    Task<List<Message>> GetPreviousDocumentMessagesAsync(string docmentId);
    Task StoreMessagesAsync(Message message, string documentId);
    Task<string> CreateNewMessageDocumentAsync(Message message, string conversationId);
}
