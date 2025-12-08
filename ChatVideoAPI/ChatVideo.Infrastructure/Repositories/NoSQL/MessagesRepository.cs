using ChatVideo.Application.Interfaces.Repositories;
using ChatVideo.Domain.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ChatVideo.Infrastructure.Repositories.NoSQL;

public class MessagesRepository : MongoRepository<Messages>, IMessagesRepository
{
    public MessagesRepository(IMongoDatabase database) : base(database)
    {
    }

    public async Task<string> CreateNewMessageDocumentAsync(Message message, string conversationId)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        var newDoc = new Messages
        {
            Id = ObjectId.GenerateNewId().ToString(),
            MessageList = new List<Message> { message },
            PreviousDocumentId = null,
            ConversationId = conversationId 
        };

        await _collection.InsertOneAsync(newDoc);

        return newDoc.Id;
    }

    public async Task<List<Message>> GetMessagesByDocumentIdAsync(string documentId)
    {
        var filter = Builders<Messages>.Filter.Eq(x => x.Id, documentId);

        var result = await _collection
            .Find(filter)
            .FirstOrDefaultAsync();

        return result?.MessageList ?? new List<Message>();
    }

    public async Task<List<Message>> GetPreviousDocumentMessagesAsync(string documentId)
    {
        var previousDocumentId = await _collection
        .Find(x => x.Id == documentId)
        .Project(x => x.PreviousDocumentId)
        .FirstOrDefaultAsync();

        if (string.IsNullOrEmpty(previousDocumentId))
            return new List<Message>();

        return await GetMessagesByDocumentIdAsync(previousDocumentId);
    }

    public async Task StoreMessagesAsync(Message message, string documentId)
    {
        if (message == null)
            throw new ArgumentNullException(nameof(message));

        if (string.IsNullOrWhiteSpace(documentId))
            throw new ArgumentException("documentId cannot be null or empty.", nameof(documentId));

        var filter = Builders<Messages>.Filter.Eq("_id", documentId);

        var update = Builders<Messages>.Update
            .Push(m => m.MessageList, message);

        var result = await _collection.UpdateOneAsync(filter, update);

        if (result.MatchedCount == 0)
        {
            throw new InvalidOperationException(
                $"Messages document with Id '{documentId}' does not exist.");
        }
    }
}
