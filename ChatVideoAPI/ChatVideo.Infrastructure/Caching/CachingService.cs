using ChatVideo.Application.Interfaces.Caching;
using Microsoft.Extensions.Caching.Memory;

namespace ChatVideo.Infrastructure.Caching;

public class CachingService : ICachingService
{
    private readonly IMemoryCache _cache;

    public CachingService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public void Set<T>(string key, T value, TimeSpan? expiry = null)
    {
        var options = new MemoryCacheEntryOptions();
        if (expiry.HasValue)
            options.SetSlidingExpiration(expiry.Value);

        _cache.Set(key, value, options);
    }

    public T? Get<T>(string key)
    {
        return _cache.TryGetValue(key, out T value) ? value : default;
    }

    public bool Exists(string key)
    {
        return _cache.TryGetValue(key, out _); // value ignored
    }

    public void Remove(string key)
    {
        _cache.Remove(key);
    }
}
