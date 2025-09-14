import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WellnessBlog = () => {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const blogs = [
  {
    id: 1,
    title: "Finding Balance: How to Manage Academic Stress",
    category: "Mental Health",
    image:
      "https://i.pinimg.com/474x/1e/e6/6a/1ee66a4517d068f5db3b0443684b748b.jpg",
    fullText: `Academic stress is something that almost every student faces, but learning how to manage it effectively can make a big difference in both your mental and physical health. Start by understanding your stress triggers — whether it’s deadlines, exams, or heavy workloads. Once you know the cause, you can plan healthier ways to respond.

Incorporating mindfulness into your daily routine is one of the most effective methods for reducing stress. Simple practices like deep breathing, journaling, or even taking a five-minute break to reset your mind can help calm your nervous system. It’s also essential to balance study with leisure — overworking leads to burnout, while regular breaks, hobbies, and social interactions help maintain a sense of wellness and motivation throughout your academic journey.

Maintaining a healthy lifestyle also contributes to managing stress. Eating nutritious meals, staying hydrated, exercising regularly, and getting adequate sleep all support mental and physical resilience. Lastly, don’t hesitate to seek support from peers, family, or counselors if you feel overwhelmed. Managing academic stress is not about avoiding challenges, but about equipping yourself with strategies to handle them successfully.`,
    author: "Dr. Channy San",
    topFoods: [
      "Dark Chocolate",
      "Green Tea",
      "Blueberries",
      "Salmon",
      "Walnuts",
      "Spinach",
      "Oatmeal",
      "Yogurt",
      "Almonds",
      "Turmeric"
    ],
  },
  {
    id: 2,
    title: "Brain Foods: Eating for Academic Success",
    category: "Nutrition",
    image:
      "https://i.pinimg.com/474x/86/6a/d0/866ad0b1e99a5a6a7809ebe4801b2147.jpg",
    fullText: `The food you eat has a direct impact on how your brain functions, especially when it comes to learning and memory. Including foods rich in omega-3 fatty acids, such as salmon, walnuts, and flaxseeds, can improve focus and cognitive function. Antioxidant-rich foods like berries, dark chocolate, and leafy greens protect your brain from stress and support long-term mental performance.

Staying hydrated is just as important as eating the right foods. Even mild dehydration can affect your concentration and energy levels, so make sure to drink enough water throughout the day. At the same time, try to avoid excessive sugar and heavily processed snacks, which may give you a quick energy boost but often lead to crashes that hurt your productivity.

Consider incorporating meals that combine protein, healthy fats, and complex carbohydrates. For example, a breakfast of oatmeal with nuts and berries or a salad with salmon and avocado provides sustained energy and supports brain health. Planning snacks and meals ahead can also prevent skipping meals, which can lead to poor focus and energy dips during study sessions.`,
    author: "Dr. Channy San",
    topFoods: [
      "Salmon",
      "Walnuts",
      "Flaxseeds",
      "Blueberries",
      "Dark Chocolate",
      "Spinach",
      "Eggs",
      "Broccoli",
      "Pumpkin Seeds",
      "Avocado"
    ],
  },
  {
    id: 3,
    title: "The Student’s Guide to Quality Sleep",
    category: "Physical Wellness",
    image:
      "https://i.pinimg.com/474x/0b/70/38/0b70385eece9929f2460e7e18f8a15e5.jpg",
    fullText: `Quality sleep is often overlooked by students, yet it plays a crucial role in academic success. Maintaining a consistent sleep schedule trains your body’s internal clock and ensures that you feel energized and alert during the day. Aiming for 7–9 hours of sleep can significantly improve memory, focus, and problem-solving skills.

Creating a calming bedtime routine helps signal to your body that it’s time to rest. This could include reading, light stretching, or listening to soft music. Limiting screen time before bed is also key, as blue light from devices interferes with melatonin production and disrupts sleep cycles.

Additionally, the sleep environment matters. Keep your bedroom cool, dark, and quiet, and reserve your bed for sleep only. Avoid caffeine or heavy meals close to bedtime, as these can interfere with falling asleep. By prioritizing sleep, you enhance your learning, mood, and overall health, turning rest into a powerful tool for academic success.`,
    author: "Dr. Channy San",
    topFoods: [
      "Almonds",
      "Kiwi",
      "Chamomile Tea",
      "Turkey",
      "Bananas",
      "Oatmeal",
      "Milk",
      "Walnuts",
      "Spinach",
      "Honey"
    ],
  },
  {
    id: 4,
    title: "Stress-Free Studying: Mind Hacks for Exams",
    category: "Stress Management",
    image:
      "https://i.pinimg.com/474x/1e/3e/88/1e3e8884e34fa76dfcfe969d1ec0bb88.jpg",
    fullText: `Exams don’t have to be overwhelming if you approach studying with the right strategies. One effective method is breaking tasks into smaller, manageable chunks. Instead of cramming large amounts of information at once, focus on one section at a time, which helps your brain retain knowledge more effectively.

Between study sessions, use relaxation techniques like meditation, stretching, or even a short walk. These breaks refresh your mind and prevent burnout. Prioritizing your tasks is also critical — work on the most challenging or urgent topics first, and avoid multitasking, which divides your attention and reduces efficiency.

In addition, creating a positive study environment can boost focus. Keep your study space organized, minimize distractions, and set specific goals for each session. Combining these mind hacks with adequate nutrition, hydration, and sleep will make exam preparation less stressful and more productive.`,
    author: "Dr. Channy San",
    topFoods: [
      "Dark Chocolate",
      "Green Tea",
      "Blueberries",
      "Salmon",
      "Nuts",
      "Spinach",
      "Oatmeal",
      "Yogurt",
      "Avocado",
      "Chamomile Tea"
    ],
  },
];


  const filteredBlogs =
    activeCategory === "All Topics"
      ? blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : blogs.filter(
          (blog) =>
            blog.category === activeCategory &&
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleCardClick = (blog) => {
    navigate("/blogdetail", { state: { blog } });
  };

  return (
    <Container className="wellness-container">
      {/* Header */}
      <div className="header">
        <h2>Health & Wellness Blogs</h2>
        <p>
          Expert guidance on how to maintain physical and mental well-being
          during your academic journey.
        </p>
      </div>

      {/* Category + Search */}
      <div className="category-search-container">
        <div className="categories">
          {["All Topics", "Mental Health", "Physical Wellness", "Nutrition", "Stress Management"].map(
            (category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid mt-4">
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="blog-card"
            style={{ cursor: "pointer" }}
            onClick={() => handleCardClick(blog)}
          >
            <Card.Img variant="top" src={blog.image} />
            <Card.Body>
              <span className="blog-category">{blog.category}</span>
              <Card.Title className="blog-title">{blog.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default WellnessBlog;
