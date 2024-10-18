using PracticaVision.Models;
using Microsoft.AspNetCore.Mvc;

namespace PracticaVision.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DrinkController
    {
        private readonly DrinkService _drinkService;
        public DrinkController(DrinkService drinkService)
        {
            _drinkService = drinkService;
        }

        [HttpPost("[action]")]
        public void AddDrink(Drink drink)
        {
           _drinkService.AddDrink(drink);
        }

        [HttpGet("[action]")]
        public List<Drink> GetAllDrinks()
        {
            return _drinkService.GetAll();
        }

        [HttpGet("[action]")]
        public Drink GetDrinkById(int id)
        {
            return _drinkService.GetById(id);
        }

        [HttpGet("[action]")]
        public List<Drink> FindDrinkByName(string name)
        {
            return _drinkService.FindByName(name);
        }

        //Pentru cazul in care se cauta numele complet si este unic
        /*[HttpGet("[action]")]
        public Drink FindDrinkByName(string name)
        {
            return _drinkService.FindByName(name);
        }*/

        [HttpGet("[action]")]
        public Drink GetRandomDrink()
        {
            return _drinkService.Random();
        }

        [HttpPut("[action]")]
        public void UpdateDrink(Drink drink)
        {
            _drinkService.Update(drink);
        }

        [HttpDelete("[action]")]
        public void DeleteDrink(int id)
        {
            _drinkService.DeleteDrink(id);
        }
    }
}
