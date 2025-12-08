namespace ChatVideo.Application.Interfaces.Caching;

public interface ICachingService
{
    void Set<T>(string key, T value, TimeSpan? expiry = null);
    T? Get<T>(string key);
    void Remove(string key);
    bool Exists(string key);
}
