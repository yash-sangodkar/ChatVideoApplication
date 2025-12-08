using ChatVideo.Application.Interfaces.Repository;
using ChatVideo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ChatVideo.Infrastructure.Repositories.SQL;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class , ChatVideoAppIdentity
{
    protected readonly ChatVideoSQLDbContext _dbContext;

    public Repository(ChatVideoSQLDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(TEntity entity)
    {
       await _dbContext.Set<TEntity>().AddAsync(entity);
    }

    public async Task AddRangerAsync(IEnumerable<TEntity> entities)
    {
        await _dbContext.Set<TEntity>().AddRangeAsync(entities);
    }

    public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> expression)
    {
       return await _dbContext.Set<TEntity>().AsNoTracking().Where(expression).ToListAsync();
    }

    public async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _dbContext.Set<TEntity>().AsNoTracking().ToListAsync();
    }

    public Task<TEntity?> GetByIdAsync(string id)
    {
        return _dbContext.Set<TEntity>().FindAsync(id).AsTask();
    }

    public void Remove(TEntity entity)
    {
        _dbContext.Set<TEntity>().Remove(entity);
    }

    public void RemoveRanger(IEnumerable<TEntity> entities)
    {
        _dbContext.Set<TEntity>().RemoveRange(entities);
    }
}
