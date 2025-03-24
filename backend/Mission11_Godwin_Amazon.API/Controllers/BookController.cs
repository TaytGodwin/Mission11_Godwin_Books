using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Godwin_Amazon.API.Data;
using System.Linq.Dynamic.Core;

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
        public IActionResult GetBooks(int pageSize=5, int pageNum =1, string sortBy="Title", [FromQuery] List<string>? BookCategories=null) // parameters
        {
            // IQueryable are built one thing at a time
            var query = _bookDbContext.Books.AsQueryable();
            
            if (BookCategories != null && BookCategories.Any()) // Check if book categories are not null
            {
                query = query.Where(c => BookCategories.Contains(c.Category)); // Only get project types when they are in the list
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

    }
}
