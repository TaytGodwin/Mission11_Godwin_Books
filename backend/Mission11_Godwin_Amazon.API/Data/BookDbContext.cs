using System;
using Microsoft.EntityFrameworkCore;
using Mission11_Godwin_Amazon.API.Data;

public class BookDbContext : DbContext
{
	public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
	{
	}

	public DbSet<Book> Books { get; set; } // For books table
}
