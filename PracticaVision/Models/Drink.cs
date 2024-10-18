using PracticaVision.Models.Enums;

namespace PracticaVision.Models
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AlcoholPercentage { get; set; }
        public float Price { get; set; }
        public DrinkCategories Category { get; set; }
    }
}
