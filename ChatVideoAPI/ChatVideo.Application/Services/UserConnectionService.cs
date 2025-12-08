using ChatVideo.Application.Interfaces.Caching;

namespace ChatVideo.Application.Services;

public class UserConnectionService
{
    private readonly ICachingService _cachingService;

    public UserConnectionService(ICachingService cachingService)
    {
        _cachingService = cachingService;
    }

    private string GetCacheKey(string userId) => $"user:{userId}:connection";

    public void SetConnection(string userId, string connectionId, TimeSpan? expiry = null)
    {
        var key = GetCacheKey(userId);
        _cachingService.Set(key, connectionId, expiry);
    }

    public string? GetConnection(string userId)
    {
        var key = GetCacheKey(userId);
        return _cachingService.Get<string>(key);
    }

    public bool HasConnection(string userId)
    {
        var key = GetCacheKey(userId);
        return _cachingService.Exists(key);
    }

    public void RemoveConnection(string userId)
    {
        var key = GetCacheKey(userId);
        _cachingService.Remove(key);
    }



}
