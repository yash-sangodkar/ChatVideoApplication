

using ChatVideo.Domain.Models;
using System.Linq.Expressions;

namespace ChatVideo.Application.Interfaces.Repository;

public interface IRepository<TEntity> where TEntity : class , ChatVideoAppIdentity
{
    Task<TEntity?> GetByIdAsync(string id);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity,bool>> expression);

    Task AddAsync(TEntity entity);
    Task AddRangerAsync(IEnumerable<TEntity> entities);

    void Remove(TEntity entity);
    void RemoveRanger(IEnumerable<TEntity> entities);
}
