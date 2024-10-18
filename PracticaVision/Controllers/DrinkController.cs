using Microsoft.AspNetCore.Mvc;

namespace PracticaVision.Controllers
{
    public class DrinkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
