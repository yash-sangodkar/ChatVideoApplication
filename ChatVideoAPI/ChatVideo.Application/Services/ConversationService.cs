using ChatVideo.Application.DTOs;
using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Application.Interfaces.Services;
using ChatVideo.Domain.Models;

namespace ChatVideo.Application.Services;

public class ConversationService : IConversationService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMessagesRepository _messagesRepository;
    private readonly IMessageService _messageService;

    public ConversationService(IUnitOfWork unitOfWork, IMessagesRepository messagesRepository, IMessageService messageService)
    {
        _unitOfWork = unitOfWork;
        _messagesRepository = messagesRepository;
        _messageService = messageService;
        
    }

    public async Task<ConversationsForDisplayDto> CreateConversation(CreateConversationDto conversation)
    { 
        var newConversation = new Conversation
        {
            Id = Guid.NewGuid().ToString(),          
            InitiatorUserId = conversation.InitiatorId,
            RecipientUserId = conversation.RecipientId,
            CreatedAt = DateTime.UtcNow
        };

        string documentId = await _messagesRepository.CreateNewMessageDocumentAsync(conversation.message, newConversation.Id);

        newConversation.LastestDocumentId = documentId;

        await _unitOfWork.Conversations.AddAsync(newConversation);
        _unitOfWork.Complete();

        _messageService.SendMessageAsync(new SendMessageDto(newConversation.Id, newConversation.InitiatorUserId, newConversation.RecipientUserId, conversation.message.Content, conversation.message.Timestamp.ToString()));

        return await GetConversationForDisplay(newConversation);
    }

    public async Task<ICollection<Conversation>> GetAllConversations()
    {
        IEnumerable<Conversation> conversations = await _unitOfWork.Conversations.GetAllAsync();
        if(conversations.Count() == 0)
        {
            return new List<Conversation>();
        }
        return conversations.ToList();
    }

    public async Task<ICollection<ConversationsForDisplayDto>> GetConversationsByUserId(string userId)
    {
        IEnumerable<Conversation> conversations = await _unitOfWork.Conversations.FindAsync(c => c.InitiatorUserId == userId || c.RecipientUserId == userId);
        if (conversations.Count() == 0)
        {
            return new List<ConversationsForDisplayDto>();
        }
        List<ConversationsForDisplayDto> conversationList = new List<ConversationsForDisplayDto>();

        foreach (var conversation in conversations)
        {
#pragma warning disable CS8604 // Possible null reference argument.
            conversationList.Add(await GetConversationForDisplay(conversation));
        }

        return conversationList;
    }

    private async Task<ConversationsForDisplayDto> GetConversationForDisplay(Conversation conversation)
    {
        return new ConversationsForDisplayDto
            (
                Id: conversation.Id,
                InitiatorUser: await GetUserById(conversation.InitiatorUserId),
                RecipientUser: await GetUserById(conversation.RecipientUserId),
                CreatedAt: conversation.CreatedAt,
                LastestMessage: await _messageService.GetLatestMessageInDocument(conversation.LastestDocumentId)
            );
    }

    //to avoid circular dependecy
    public async Task<UserLoggedInDetails?> GetUserById(string userId)
    {
        User? user = await _unitOfWork.Users.GetByIdAsync(userId);

        if (user == null)
            return null;

        return new UserLoggedInDetails
        (
            Id: user.Id,
            Username: user.Username
        );
    }
}
