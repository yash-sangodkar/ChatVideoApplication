using ChatVideo.Application.Interfaces.Repository;
using ChatVideo.Domain.Models;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace ChatVideo.Infrastructure.Repositories.NoSQL;

public class MongoRepository<TEntity> : IRepository<TEntity> where TEntity : class , ChatVideoAppIdentity
{
    protected readonly IMongoCollection<TEntity> _collection;
    public MongoRepository(IMongoDatabase database)
    {
        _collection = database.GetCollection<TEntity>(typeof(TEntity).Name);
    }
    public async Task AddAsync(TEntity entity)
    {
        await _collection.InsertOneAsync(entity);
    }

    public Task AddRangerAsync(IEnumerable<TEntity> entities)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> expression)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }

    public async Task<TEntity?> GetByIdAsync(string id)
    {
        return await _collection.Find(Builders<TEntity>.Filter.Eq("Id", id)).FirstOrDefaultAsync();
    }

    public async void Remove(TEntity entity)
    {
        await _collection.DeleteOneAsync(Builders<TEntity>.Filter.Eq("Id", entity.Id));
    }

    public void RemoveRanger(IEnumerable<TEntity> entities)
    {
        throw new NotImplementedException();
    }
}
