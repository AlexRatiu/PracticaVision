using PracticaVision.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PracticaVision.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DrinkController : ControllerBase
    {
        private readonly DrinkService _drinkService;
        public DrinkController(DrinkService drinkService)
        {
            _drinkService = drinkService;
        }

        [HttpPost("[action]")]
        public IActionResult AddDrink(Drink drink)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           _drinkService.AddDrink(drink);
            return Ok("Drink added!");
        }

        [HttpGet("[action]")]
        public IActionResult GetAllDrinks()
        {
            var drinks = _drinkService.GetAll();
            return Ok(drinks);
        }

        [HttpGet("[action]")]
        public IActionResult GetOddDrinks()
        {
            var drinks = _drinkService.GetOdd();
            return Ok(drinks);
        }

        [HttpGet("[action]")]
        public IActionResult GetPageDrinks(int pageNumber, int pageSize)
        {
            var drinks = _drinkService.GetPage(pageNumber, pageSize);
            return Ok(drinks);
        }

        [HttpGet("[action]")]
        public IActionResult GetDrinkById(int id)
        {
            var drink = _drinkService.GetById(id);
            if(drink == null)
            {
                return NotFound($"Drink with Id {id} not found.");
            }

            return Ok(drink);
        }

        [HttpGet("[action]")]
        public IActionResult FindDrinkByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name parameter is required.");
            }

            var drinks = _drinkService.FindByName(name);
            if(drinks.Count == 0)
            {
                return NotFound($"No drinks with name containing '{name}' found.");
            }

            return Ok(drinks);
        }

        //Pentru cazul in care se cauta numele complet si este unic
        /*[HttpGet("[action]")]
        public IActionResult FindDrinkByName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name parameter is required.");
            }

            var drink = _drinkService.FindByName(name);
            if (drink.Count == 0)
            {
                return NotFound($"There is no drink called '{name}'");
            }

            return Ok(drink);
        }*/

        [HttpGet("[action]")]
        public IActionResult GetRandomDrink()
        {
            var drink = _drinkService.Random();
            return Ok(drink);
        }

        [HttpPut("[action]")]
        public IActionResult UpdateDrink(Drink drink)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drinkToUpdate = _drinkService.GetById(drink.Id);
            if (drinkToUpdate == null)
            {
                return NotFound($"There is no drink with Id {drink.Id}");
            }

            _drinkService.Update(drink);
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult DeleteDrink(int id)
        {
            var drink = _drinkService.GetById(id);
            if (drink == null)
            {
                return NotFound($"There is no drink with Id {id}");
            }
            _drinkService.DeleteDrink(id);
            return Ok();
        }
    }
}
