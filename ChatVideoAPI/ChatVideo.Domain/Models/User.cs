namespace ChatVideo.Domain.Models;

public class User : ChatVideoAppIdentity
{
    public string Id { get; set; }
    public string Username { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
}
