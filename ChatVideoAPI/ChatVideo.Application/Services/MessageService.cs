using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Hub;
using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Services;

public class MessageService : IMessageService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMessagesRepository _messagesRepository;
    private readonly ISignalRMessageNotifier _signalRMessageNotifier;
    private readonly UserConnectionService _userConnectionService;

    public MessageService(IUnitOfWork unitOfWork, IMessagesRepository messagesRepository, ISignalRMessageNotifier signalRMessageNotifier, UserConnectionService userConnectionService)
    {
        _unitOfWork = unitOfWork;
        _messagesRepository = messagesRepository;
        _signalRMessageNotifier = signalRMessageNotifier;
        _userConnectionService = userConnectionService;
    }

    public async Task<string> GetLatestMessageInDocument(string documentId)
    {
        List<Message> messages = await _messagesRepository.GetMessagesByDocumentIdAsync(documentId);
        if (messages == null || messages.Count == 0)
        {
            return string.Empty;
        }
        Message latestMessage = messages.OrderByDescending(m => m.Timestamp).First();
        return latestMessage.Content;
    }

    public async Task<IEnumerable<Message>> GetMessagesAsync(string conversationId)
    {
        Conversation? conversation = await _unitOfWork.Conversations.GetByIdAsync(conversationId);
        if (conversation == null)
        {
            throw new KeyNotFoundException("Conversation not found.");
        }
        List<Message> messages = await _messagesRepository.GetMessagesByDocumentIdAsync(conversation.LastestDocumentId);

        if (messages == null || messages.Count == 0)
        {
            return Enumerable.Empty<Message>();
        }

        return messages;
    }

    public async Task ProcessMessage(SendMessageDto request)
    {
        SendMessageAsync(request);
        await StoreMessage(request);
    }

    public void SendMessageAsync(SendMessageDto request)
    {
        string connectionId = _userConnectionService.GetConnection(request.ToUserId);
        if (connectionId == null) 
        { 
            Console.WriteLine($"Connection Id not available for userId:{request.ToUserId}");
            return;
        }
        _signalRMessageNotifier.NewMessageReceived(request, connectionId);
    }

    private async Task StoreMessage(SendMessageDto request)
    {
        var documentId = (await _unitOfWork.Conversations.GetByIdAsync(request.ConversationId))?.LastestDocumentId;   
        await _messagesRepository.StoreMessagesAsync(new Message
            {
                FromUserId = request.FromUserId,
                ToUserId = request.ToUserId,
                Content = request.Content,
                Timestamp = DateTime.Parse(request.Timestamp),
            }, documentId);
    }    
}
