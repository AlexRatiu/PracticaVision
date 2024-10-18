using PracticaVision.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace PracticaVision.Models
{
    public class Drink
    {
        [Required(ErrorMessage = "Drink must have an Id!")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Drink must have a name!")]
        [StringLength(100, ErrorMessage = "Name must be shorter than 100 characters.")]
        public string Name { get; set; }

        [Range(0, 80, ErrorMessage = "Alchool percentage must be in range 0 to 80.")]
        public int AlcoholPercentage { get; set; }

        [Range(0.1, 10000, ErrorMessage = "Price must be in range 0.1 to 10000.")]
        public float Price { get; set; }

        [Required(ErrorMessage = "Category is required!")]
        public DrinkCategories Category { get; set; }
    }
}
