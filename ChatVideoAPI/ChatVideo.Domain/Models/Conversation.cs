
namespace ChatVideo.Domain.Models;

public class Conversation : ChatVideoAppIdentity
{
    public string Id { get; set; } = String.Empty;
    public string InitiatorUserId { get; set; } = String.Empty;
    public string RecipientUserId { get; set; } = String.Empty; 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string LastestDocumentId { get; set; } = String.Empty;
}
