using ChatVideo.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatVideo.Infrastructure
{
    public class ChatVideoSQLDbContext : DbContext
    {
        public ChatVideoSQLDbContext(DbContextOptions<ChatVideoSQLDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Username)
                      .HasMaxLength(250)
                      .IsRequired();

                entity.Property(u => u.Password)
                      .HasMaxLength(250)
                      .IsRequired();

            });

            modelBuilder.Entity<Conversation>(entity =>
            {
                entity.ToTable("Conversations");
                entity.HasKey(c => c.Id);

                /// FK: Conversation.InitiatorUserId → Users.Id
                entity.HasOne<User>()           
                      .WithMany()
                      .HasForeignKey(c => c.InitiatorUserId)
                      .OnDelete(DeleteBehavior.Restrict);

                // FK: Conversation.RecipientUserId → Users.Id
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(c => c.RecipientUserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
    }
}
