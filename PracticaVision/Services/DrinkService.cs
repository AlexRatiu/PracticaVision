using PracticaVision.Models;
using PracticaVision.Models.Enums;
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

    private List<Drink> context = new List<Drink>
    {
        new Drink{Id = 1, Name = "Water", AlcoholPercentage = 0, Price = 4.5f, Category = DrinkCategories.Water},
        new Drink{Id = 2, Name = "Coffee", AlcoholPercentage = 0, Price = 8, Category = DrinkCategories.Cofee},
        new Drink{Id = 3, Name = "Tea", AlcoholPercentage = 0, Price = 6.5f, Category = DrinkCategories.Tea},
        new Drink{Id = 4, Name = "Juice", AlcoholPercentage = 0, Price = 7, Category = DrinkCategories.Juice},
        new Drink{Id = 5, Name = "Soda", AlcoholPercentage = 0, Price = 5, Category = DrinkCategories.Soda},
        new Drink{Id = 6, Name = "Beer", AlcoholPercentage = 5, Price = 9, Category = DrinkCategories.Beer},
        new Drink{Id = 7, Name = "Wine", AlcoholPercentage= 13, Price = 25, Category = DrinkCategories.Wine}

    };

    public DrinkService() { }

    public List<Drink> GetAll()
    {
        return context;
    }

    public Drink GetById(int id)
    {
        return context.Find(drink => drink.Id == id);
    }

    public void AddDrink(Drink newDrink)
    {
        if(!context.Exists(drink => drink.Id == newDrink.Id))
        {
            context.Add(newDrink);
        }
    }

    public void DeleteDrink(int id)
    {
        if(GetById(id) != null)
        {
            context.Remove(GetById(id));
        }
    }

    //In cazul in care numele trebuie sa se potriveasca perfect si este unic
      
    /* public Drink FindByName(string name)
    {
        return context.Find(drink => drink.Name ==  name);
    }*/

    //In cazul in care numele trebuie doar sa contina secventa si nu este unic
    public List<Drink> FindByName(string name)
    {
        return context.Where(drink => drink.Name.IndexOf(name, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
    }

    public void Update(Drink updateDrink)
    {
        var drinkToUpdate = context.Find(drink => drink.Id == updateDrink.Id);

        if(drinkToUpdate != null)
        {
            drinkToUpdate.Name = updateDrink.Name;
            drinkToUpdate.Price = updateDrink.Price;
            drinkToUpdate.AlcoholPercentage = updateDrink.AlcoholPercentage;
            drinkToUpdate.Category = updateDrink.Category;
        }
    }

    public Drink Random()
    {
        var random = new Random();
        int randomId = random.Next(context.Count);
        return context.Find(drink => drink.Id == randomId);
    }
}