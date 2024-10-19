using PracticaVision.Models;
using PracticaVision.DataContext;
using Microsoft.EntityFrameworkCore;
public class DrinkService
{
    /*private Dictionary<int, string> context = new Dictionary<int, string> {
            { 1, "Water" },
            { 2, "Coffee" },
            { 3, "Tea" },
            { 4, "Juice" },
            { 5, "Soda" },
            { 6, "Beer" },
            { 7, "Wine" }
        };*/

    /*private List<Drink> context = new List<Drink>
    {
        new Drink{Id = 1, Name = "Water", AlcoholPercentage = 0, Price = 4.5f, Category = DrinkCategories.Water},
        new Drink{Id = 2, Name = "Coffee", AlcoholPercentage = 0, Price = 8, Category = DrinkCategories.Cofee},
        new Drink{Id = 3, Name = "Tea", AlcoholPercentage = 0, Price = 6.5f, Category = DrinkCategories.Tea},
        new Drink{Id = 4, Name = "Juice", AlcoholPercentage = 0, Price = 7, Category = DrinkCategories.Juice},
        new Drink{Id = 5, Name = "Soda", AlcoholPercentage = 0, Price = 5, Category = DrinkCategories.Soda},
        new Drink{Id = 6, Name = "Beer", AlcoholPercentage = 5, Price = 9, Category = DrinkCategories.Beer},
        new Drink{Id = 7, Name = "Wine", AlcoholPercentage= 13, Price = 25, Category = DrinkCategories.Wine}

    };*/

    private readonly DrinksDbContext _context;

    public DrinkService(DrinksDbContext context)
    {
        _context = context;
    }

    public List<Drink> GetAll()
    {
        return _context.Drinks.ToList();
    }

    public Drink GetById(int id)
    {
        return _context.Drinks.Find(id);
    }

    public void AddDrink(Drink newDrink)
    {
        if(!_context.Drinks.Any(drink => drink.Id == newDrink.Id))
        {
            _context.Drinks.Add(newDrink);
            _context.SaveChanges();
        }
    }

    public void DeleteDrink(int id)
    {
        var drink = _context.Drinks.Find(id);
        if(drink != null)
        {
            _context.Drinks.Remove(drink);
            _context.SaveChanges();
        }
    }

    //In cazul in care numele trebuie sa se potriveasca perfect si este unic

    /*public Drink FindByName(string name)
    {
        return _context.Drinks.FirstOrDefault(drink => drink.Name == name);
    }*/

    //In cazul in care numele trebuie doar sa contina secventa si nu este unic
    public List<Drink> FindByName(string name)
    {
        return _context.Drinks.Where(drink => EF.Functions.Like(drink.Name, $"%{name}")).ToList();
    }

    public void Update(Drink updateDrink)
    {
        var drinkToUpdate = _context.Drinks.Find(updateDrink.Id);

        if(drinkToUpdate != null)
        {
            drinkToUpdate.Name = updateDrink.Name;
            drinkToUpdate.Price = updateDrink.Price;
            drinkToUpdate.AlcoholPercentage = updateDrink.AlcoholPercentage;
            drinkToUpdate.Category = updateDrink.Category;
            _context.SaveChanges();
        }
    }

    public Drink Random()
    {
        return _context.Drinks.ToList().OrderBy(d => Guid.NewGuid()).FirstOrDefault();
    }

    public List<Drink> GetOdd()
    {
        return _context.Drinks.Where(drink => drink.Id % 2 == 1).ToList();
    }

    public List <Drink> GetPage(int pageNumber, int pageSize)
    {
        int skip = (pageNumber - 1) * pageSize;
        
        return _context.Drinks.Skip(skip).Take(pageSize).ToList();
    }
}