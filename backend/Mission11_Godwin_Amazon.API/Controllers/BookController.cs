using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Godwin_Amazon.API.Data;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore.Query;

namespace Mission11_Godwin_Amazon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // Instance of context file
        private BookDbContext _bookDbContext;
        public BookController(BookDbContext bookDbContext) => _bookDbContext = bookDbContext; // Set instance

        [HttpGet("AllBooks")] // Get all books
        public IActionResult GetBooks(int pageSize=5, int pageNum =1, string sortBy="Title", [FromQuery] List<string>? categoryTypes=null) // parameters
        {
            // IQueryable are built one thing at a time
            var query = _bookDbContext.Books.AsQueryable();
            
            if (categoryTypes != null && categoryTypes.Any()) // Check if book categories are not null
            {
                query = query.Where(c => categoryTypes.Contains(c.Category)); // Only get project types when they are in the list
            }

            var AllBooks = query // Narrowed down, filtered list
                .OrderBy(sortBy) // Uses using System.Linq.Dynamic.Core; to sort by the preference that the user gave
                .Skip((pageNum-1)*pageSize) // Skips the page size amount until it gets to the page you are on
                .Take(pageSize) // Sends how many the user selected
                .ToList();

            var totalNumBooks = query.Count();

            var TotalObject = new
                            {
                                Books = AllBooks,
                                totalNumBooks
                            };

            return Ok(TotalObject);
        }

        [HttpGet("GetCategories")]
        public IActionResult GetCategories ()
        {
            var AllCategories = _bookDbContext.Books
                .Select(b => b.Category)
                .Distinct() // Get distinc categories from the books table
                .ToList();

            return Ok(AllCategories);
        }

        // To add books
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) // Frombody means it is coming in the body as json
        {
            _bookDbContext.Books.Add(newBook);
            _bookDbContext.SaveChanges();

            return Ok(newBook);
        }

        // To edit books
        [HttpPut("UpdateBook/{BookId}")]
        public IActionResult UpdateBook(int BookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookDbContext.Books.Find(BookId); // Find the project to edit

            // Update everything
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            // Update database with edits
            _bookDbContext.Books.Update(existingBook);
            _bookDbContext.SaveChanges();

            return Ok(existingBook);
        }

        // To delete a book
        [HttpDelete("DeleteBook/{BookId}")]
        public IActionResult DeleteBook(int BookId)
        {
            var book = _bookDbContext.Books.Find(BookId); // Get the book

            if (book == null)
            {
                return NotFound(new {message = "Project not found"});
            }

            // Save changes to database
            _bookDbContext.Books.Remove(book);
            _bookDbContext.SaveChanges();

            return NoContent();
        }
    }
}
