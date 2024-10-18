public class DrinkService
{
    private Dictionary<int, string> context = new Dictionary<int, string> {
            { 1, "Water" },
            { 2, "Coffee" },
            { 3, "Tea" },
            { 4, "Juice" },
            { 5, "Soda" },
            { 6, "Beer" },
            { 7, "Wine" }
        };

    public DrinkService() { }

    public Dictionary<int, string> GetAll()
    {
        return context;
    }

    public string GetById(int id)
    {
        return context[id];
    }
}