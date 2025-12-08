

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatVideo.Domain.Models;

public class Messages : ChatVideoAppIdentity
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; }

    [BsonRepresentation(BsonType.String)]
    public string PreviousDocumentId { get; set; }
    public string ConversationId { get; set; }
    public List<Message> MessageList { get; set; }
}

public class Message
{
    public string FromUserId { get; set; }
    public string ToUserId { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
}


