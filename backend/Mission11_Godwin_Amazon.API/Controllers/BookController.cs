﻿using System.Reflection;
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
        public IActionResult GetBooks(int pageSize=5, int pageNum =1, string sortBy="Title") // parameters
        {
            var AllBooks = _bookDbContext.Books
                .OrderBy(sortBy) // Uses using System.Linq.Dynamic.Core; to sort by the preference that the user gave
                .Skip((pageNum-1)*pageSize) // Skips the page size amount until it gets to the page you are on
                .Take(pageSize) // Sends how many the user selected
                .ToList();

            var totalNumBooks = _bookDbContext.Books.Count();

            var TotalObject = new
                            {
                                Books = AllBooks,
                                totalNumBooks
                            };

            return Ok(TotalObject);
        }

    }
}
