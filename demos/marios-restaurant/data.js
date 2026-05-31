const restaurantData = {
  restaurantName: "Mario's",
  tagline: "Authentic Italian Classics, Philly Cheesesteaks & Homestyle Comfort Dinners",
  phone: "(704) 278-4444",
  whatsapp: "+17042784444", // For order dispatch
  address: "8850 Statesville Blvd, Cleveland, NC 27013",
  mapsLink: "https://maps.google.com/?q=Mario's+Cleveland+NC",
  aboutText: "Family-owned and operated in Cleveland, NC, Mario's is a cornerstone of the local community. We pride ourselves on serving generous portions of homemade Italian specialties, classic Philly cheesesteaks, Greek gyros and souvlaki, and homestyle comfort dinners. Whether you're dining in our cozy dining room or ordering takeout for the family, you're treated like one of our own.",
  hours: {
    "Monday - Thursday": "11:00 AM - 9:00 PM",
    "Friday - Saturday": "11:00 AM - 10:00 PM",
    "Sunday": "Closed"
  },
  menu: [
    {
      category: "Burgers & Clubs",
      items: [
        {
          name: "Hamburger or Cheeseburger",
          price: "10.99",
          desc: "Topped with lettuce, tomato, onions, and mayo. Served with French fries, pasta salad, or chips.",
          image: "https://images.pexels.com/photos/18867543/pexels-photo-18867543.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Bacon or Mushroom Swiss Burger",
          price: "11.99",
          desc: "Topped with bacon or mushrooms, Swiss cheese, lettuce, tomato, onions, and mayo. Served with fries or chips.",
          image: "https://images.pexels.com/photos/23106708/pexels-photo-23106708.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Turkey or Ham Club",
          price: "11.99",
          desc: "Lettuce, tomato, mayo, bacon, choice of white, wheat, or rye toast. Served with fries, chips, or pasta salad.",
          image: "https://images.pexels.com/photos/6416558/pexels-photo-6416558.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Combo Club Sandwich",
          price: "12.50",
          desc: "Triple decker club with sliced turkey, ham, salami, lettuce, tomato, bacon, and mayo on toast.",
          image: "https://images.pexels.com/photos/29747752/pexels-photo-29747752.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Cheeseburger or Chicken Club",
          price: "12.50",
          desc: "Your choice of cheeseburger patty or grilled chicken breast layered with bacon, lettuce, tomato, and mayo on toast.",
          image: "https://images.pexels.com/photos/20722058/pexels-photo-20722058.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Special Sandwiches",
      items: [
        {
          name: "Buffalo Chicken Sub",
          price: "11.99",
          desc: "Fried chicken tenders dipped in mild wing sauce topped with lettuce, tomato, onions, and ranch dressing.",
          image: "https://images.pexels.com/photos/5446513/pexels-photo-5446513.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Chicken Filet or Grilled Sandwich",
          price: "11.30",
          desc: "Tender grilled or breaded chicken filet topped with lettuce, tomato, onions, and mayo on a toasted bun.",
          image: "https://images.pexels.com/photos/20722043/pexels-photo-20722043.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Monte Carlo Chicken Sandwich",
          price: "11.99",
          desc: "Grilled chicken breast topped with lettuce, tomato, onions, bacon, Swiss cheese, and mayo on bread.",
          image: "https://images.pexels.com/photos/20722043/pexels-photo-20722043.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Corned Beef or Turkey Reuben",
          price: "11.50",
          desc: "Topped with sauerkraut, Thousand Island dressing, and Swiss cheese on grilled rye bread.",
          image: "https://images.pexels.com/photos/6493113/pexels-photo-6493113.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Turkey Melt Sandwich",
          price: "11.50",
          desc: "Turkey breast with melted Swiss cheese and grilled onions on grilled rye bread.",
          image: "https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled Chicken or Beef Patty Melt",
          price: "11.50",
          desc: "Hamburger patty or chicken breast with melted Swiss cheese and grilled onions on grilled rye bread.",
          image: "https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Flounder Fish Sandwich",
          price: "11.99",
          desc: "Crispy fried flounder filet with lettuce & tomato, served with tartar sauce on the side.",
          image: "https://images.pexels.com/photos/12129480/pexels-photo-12129480.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Phillys & Subs",
      items: [
        {
          name: "Philly Chicken or Cheese Steak",
          price: "10.99",
          desc: "Shaved steak or chicken sautéed with white American cheese, onions, peppers, mushrooms, and mayo on hoagie bread.",
          image: "https://images.pexels.com/photos/6416558/pexels-photo-6416558.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Supreme Philly Chicken or Cheese Steak",
          price: "11.50",
          desc: "Shaved steak or chicken with onions, peppers, mushrooms, melted cheese, lettuce, tomato, and mayo.",
          image: "https://images.pexels.com/photos/37264133/pexels-photo-37264133.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Turkey or Ham Sub (Hot or Cold)",
          price: "11.50",
          desc: "Choice of sliced turkey or ham topped with lettuce, tomato, onions, provolone cheese, and house dressing.",
          image: "https://images.pexels.com/photos/20867465/pexels-photo-20867465.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Italian Sub (Ham, Turkey & Salami)",
          price: "12.99",
          desc: "Stacked ham, turkey, salami, provolone cheese, lettuce, tomato, onions, and house Italian dressing.",
          image: "https://images.pexels.com/photos/20867465/pexels-photo-20867465.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Parmigiana Subs",
      items: [
        {
          name: "Chicken Parmigiana Sub",
          price: "11.50",
          desc: "Tender breaded chicken breast topped with marinara sauce and melted cheese on a hoagie roll.",
          image: "https://images.pexels.com/photos/20867465/pexels-photo-20867465.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Eggplant Parmigiana Sub",
          price: "11.50",
          desc: "Breaded eggplant slices baked with house tomato sauce and mozzarella cheese on hoagie bread.",
          image: "https://images.pexels.com/photos/29039066/pexels-photo-29039066.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Meatball Parmigiana Sub",
          price: "11.50",
          desc: "Homemade beef meatballs baked with tomato sauce and mozzarella cheese on regular or wheat hoagie roll.",
          image: "https://images.pexels.com/photos/4161714/pexels-photo-4161714.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Traditional Pastas",
      items: [
        {
          name: "Pasta w/ Homemade Tomato Sauce",
          price: "11.50",
          desc: "Choice of spaghetti, linguine, fettuccine, penne, or angel hair pasta topped with house tomato sauce. Served with salad.",
          image: "https://images.pexels.com/photos/23106701/pexels-photo-23106701.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Pasta w/ Homemade Meat Sauce",
          price: "13.99",
          desc: "Pasta choice topped with rich beef bolognese meat sauce. Served with dinner salad and garlic bread.",
          image: "https://images.pexels.com/photos/11101711/pexels-photo-11101711.png?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Pasta with Italian Meatballs",
          price: "13.99",
          desc: "Spaghetti or penne noodles topped with marinara and savory house-made beef meatballs. Served with salad and bread.",
          image: "https://images.pexels.com/photos/4161714/pexels-photo-4161714.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Pasta with Italian Sausage",
          price: "13.99",
          desc: "Choice of noodles topped with savory grilled Italian sausage links and tomato sauce. Served with salad.",
          image: "https://images.pexels.com/photos/12667658/pexels-photo-12667658.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Fettuccine Alfredo (Plain)",
          price: "13.99",
          desc: "Creamy butter and parmesan cream sauce tossed with fettuccine noodles. Served with garlic bread.",
          image: "https://images.pexels.com/photos/8588500/pexels-photo-8588500.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Fettuccine Alfredo w/ Chicken",
          price: "15.50",
          desc: "Our rich, creamy alfredo fettuccine topped with juicy grilled chicken breast. Served with salad.",
          image: "https://images.pexels.com/photos/10966592/pexels-photo-10966592.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Fettuccine Alfredo w/ Shrimp",
          price: "16.99",
          desc: "Rich parmesan cream sauce tossed with fettuccine, topped with seasoned grilled gulf shrimp.",
          image: "https://images.pexels.com/photos/8588500/pexels-photo-8588500.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Pasta Primavera w/ Chicken",
          price: "15.50",
          desc: "Noodles sautéed with fresh zucchini, squash, broccoli, and tomatoes, topped with grilled chicken.",
          image: "https://images.pexels.com/photos/10966592/pexels-photo-10966592.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Pasta Primavera w/ Shrimp",
          price: "16.99",
          desc: "Fresh garden vegetables sautéed in garlic and oil, tossed with pasta and grilled shrimp.",
          image: "https://images.pexels.com/photos/8588501/pexels-photo-8588501.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Greek Flavors",
      items: [
        {
          name: "Chicken Souvlaki Pita Sandwich",
          price: "11.50",
          desc: "Grilled chicken tips topped with lettuce, tomato, onions, and tzatziki sauce wrapped in pita bread.",
          image: "https://images.pexels.com/photos/29306501/pexels-photo-29306501.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Beef or Chicken Gyro Sandwich",
          price: "11.50",
          desc: "Sliced seasoned gyro meat wrapped in pita with lettuce, tomato, onions, and tzatziki sauce.",
          image: "https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Chicken Souvlaki Platter",
          price: "13.99",
          desc: "Grilled chicken tips served with French fries, Greek salad, pita bread, and tzatziki sauce.",
          image: "https://images.pexels.com/photos/32986493/pexels-photo-32986493.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Beef or Chicken Gyro Platter",
          price: "13.99",
          desc: "Seasoned gyro meat served with French fries, Greek salad, pita bread, and tzatziki sauce.",
          image: "https://images.pexels.com/photos/29285459/pexels-photo-29285459.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Gourmet Wraps",
      items: [
        {
          name: "Chicken Caesar Wrap",
          price: "11.50",
          desc: "Marinated grilled chicken with romaine lettuce, Caesar dressing, and Parmesan cheese in tortilla.",
          image: "https://images.pexels.com/photos/19087691/pexels-photo-19087691.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Shrimp Caesar Wrap",
          price: "12.99",
          desc: "Seasoned grilled shrimp with romaine lettuce, Caesar dressing, and grated Parmesan in tortilla wrap.",
          image: "https://images.pexels.com/photos/23106702/pexels-photo-23106702.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled or Fried Chicken Wrap",
          price: "11.50",
          desc: "Grilled chicken breast or tenders with lettuce, tomato, mixed cheese, and choice of ranch or honey mustard.",
          image: "https://images.pexels.com/photos/29007123/pexels-photo-29007123.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Philly Steak or Chicken Wrap",
          price: "11.50",
          desc: "Chopped seasoned beef or chicken grilled with peppers and onions, tomatoes, ranch, and cheese.",
          image: "https://images.pexels.com/photos/14077456/pexels-photo-14077456.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Specialty Dinners",
      items: [
        {
          name: "Country Fried Steak (or Chicken)",
          price: "14.99",
          desc: "Crispy fried steak smothered in white country gravy. Served with side, house salad, and garlic bread.",
          image: "https://images.pexels.com/photos/1314041/pexels-photo-1314041.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Hawaiian Grilled Chicken",
          price: "14.99",
          desc: "Two chicken breasts topped with grilled chopped ham and pineapple rings. Served with choice of side.",
          image: "https://images.pexels.com/photos/37198642/pexels-photo-37198642.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Louisiana Grilled Chicken",
          price: "14.99",
          desc: "Two juicy chicken breasts topped with sautéed fresh mushrooms and green bell peppers.",
          image: "https://images.pexels.com/photos/37198642/pexels-photo-37198642.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled Chicken & Shrimp Dinner",
          price: "16.99",
          desc: "Combination platter of seasoned grilled chicken breast and skewered shrimp. Served with dinner side.",
          image: "https://images.pexels.com/photos/37198642/pexels-photo-37198642.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Chopped Hamburger Steak",
          price: "14.99",
          desc: "Chopped steak topped with sautéed onions, bell peppers, mushrooms, and rich brown gravy. Served with side.",
          image: "https://images.pexels.com/photos/14678998/pexels-photo-14678998.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Popeye Grilled Chicken Dinner",
          price: "14.99",
          desc: "Chicken breast topped with fresh spinach leaves and melted mozzarella. Served with side and salad.",
          image: "https://images.pexels.com/photos/37198642/pexels-photo-37198642.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled or Blackened Chicken",
          price: "14.99",
          desc: "Two chicken breasts seasoned and grilled (or blackened). Served with salad, bread, and one side.",
          image: "https://images.pexels.com/photos/9219086/pexels-photo-9219086.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Fresh Salads",
      items: [
        {
          name: "House Salad (Large)",
          price: "7.99",
          desc: "Crisp salad greens with tomatoes, cucumber, red onions, and carrots. (Small available for $4.50)",
          image: "https://images.pexels.com/photos/8992844/pexels-photo-8992844.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Chef Salad Platter",
          price: "11.99",
          desc: "Loaded with julienned ham, salami, turkey, mixed cheeses, and sliced boiled egg over our house salad.",
          image: "https://images.pexels.com/photos/26341204/pexels-photo-26341204.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Greek Salad",
          price: "11.99",
          desc: "Topped with Greek olives, pepperoncini, feta cheese, and stuffed grape leaves. Served with vinaigrette.",
          image: "https://images.pexels.com/photos/8697517/pexels-photo-8697517.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Mario's Special Salad",
          price: "13.99",
          desc: "Our signature salad topped with olives, pepperoncini, feta cheese, grape leaves, gyro meat, and chicken.",
          image: "https://images.pexels.com/photos/8697517/pexels-photo-8697517.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled or Fried Chicken Salad",
          price: "11.99",
          desc: "Salad topped with choice of marinated grilled chicken or fried tenders and mixed cheeses.",
          image: "https://images.pexels.com/photos/29253300/pexels-photo-29253300.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Buffalo or Blackened Chicken Salad",
          price: "12.50",
          desc: "Chicken dipped in mild buffalo sauce (or seasoned blackened style) over salad with mixed cheese.",
          image: "https://images.pexels.com/photos/26341207/pexels-photo-26341207.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Caesar Salad with Chicken",
          price: "12.50",
          desc: "Crisp romaine, Caesar dressing, and shaved Parmesan, topped with marinated grilled chicken.",
          image: "https://images.pexels.com/photos/19087691/pexels-photo-19087691.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Caesar Salad with Salmon",
          price: "14.50",
          desc: "Romaine tossed with croutons, parmesan, and Caesar dressing, topped with grilled salmon filet.",
          image: "https://images.pexels.com/photos/19087691/pexels-photo-19087691.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Seafood & Quesadillas",
      items: [
        {
          name: "Grilled Salmon Platter",
          price: "16.99",
          desc: "Grilled premium salmon fillet cooked to order, served with a salad, choice of side, and dinner bread.",
          image: "https://images.pexels.com/photos/7627414/pexels-photo-7627414.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled Shrimp Platter",
          price: "16.99",
          desc: "Skewered gulf shrimp seasoned and grilled over fire. Served with side, side salad, and fresh bread.",
          image: "https://images.pexels.com/photos/37215009/pexels-photo-37215009.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Chicken or Philly Steak Quesadilla",
          price: "11.50",
          desc: "Folded grilled tortilla filled with salsa, sour cream, tomatoes, scallions, peppers, melted cheese, and rice.",
          image: "https://images.pexels.com/photos/9026623/pexels-photo-9026623.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Grilled Shrimp Quesadilla",
          price: "12.99",
          desc: "Flour tortilla loaded with grilled shrimp, melted cheeses, green onions, and fresh tomato, served with rice.",
          image: "https://images.pexels.com/photos/9026623/pexels-photo-9026623.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    },
    {
      category: "Sides & Extras",
      items: [
        {
          name: "House Sautéed Vegetables",
          price: "3.99",
          desc: "Fresh mixed squash, onions, and seasonal vegetables lightly seasoned and sautéed.",
          image: "https://images.pexels.com/photos/17290750/pexels-photo-17290750.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Steamed Broccoli",
          price: "3.99",
          desc: "Fresh steamed broccoli crowns seasoned lightly with garlic butter.",
          image: "https://images.pexels.com/photos/90893/pexels-photo-90893.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Steamed Green Beans",
          price: "3.99",
          desc: "Southern style seasoned green beans cooked tender.",
          image: "https://images.pexels.com/photos/3004798/pexels-photo-3004798.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Mashed Potatoes (with Gravy)",
          price: "3.99",
          desc: "Creamy home-style mashed potatoes served with brown or white gravy.",
          image: "https://images.pexels.com/photos/2739250/pexels-photo-2739250.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Fried Squash",
          price: "3.99",
          desc: "Crispy breaded yellow squash slices fried until golden brown.",
          image: "https://images.pexels.com/photos/33025811/pexels-photo-33025811.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Fried Okra",
          price: "3.99",
          desc: "Battered crispy cut okra bites fried to perfection.",
          image: "https://images.pexels.com/photos/8696468/pexels-photo-8696468.jpeg?auto=compress&cs=tinysrgb&h=350"
        },
        {
          name: "Side French Fries",
          price: "3.99",
          desc: "Basket of golden crinkle-cut French fries.",
          image: "https://images.pexels.com/photos/5041473/pexels-photo-5041473.jpeg?auto=compress&cs=tinysrgb&h=350"
        }
      ]
    }
  ],
  reviews: [
    {
      author: "David Rowan",
      rating: 5,
      text: "The absolute best Philly cheesesteak in Rowan County. Generous portions and very reasonable prices. The owners treat you like family."
    },
    {
      author: "Sarah Henderson",
      rating: 5,
      text: "We ordered the Chicken Parmigiana and Baked Lasagna for takeout. The food was hot, delicious, and the lasagna is huge! Cozy place, excellent service."
    },
    {
      author: "Marcus G.",
      rating: 5,
      text: "The Philly cheesesteaks and chicken souvlaki platters are out of this world! Massive portions, fresh ingredients, and the tzatziki sauce is clearly homemade. Mario's is a true local gem in Cleveland."
    },
    {
      author: "Jennifer L.",
      rating: 5,
      text: "Fettuccine Alfredo with shrimp was absolutely divine. The sauce was perfectly creamy and the shrimp were so fresh. This place never disappoints — we come every Friday night."
    },
    {
      author: "Tom Caldwell",
      rating: 5,
      text: "Best gyro platter I've had outside of a Greek festival. The tzatziki is homemade and the portions are massive. Friendly staff, clean restaurant. 10/10 every single time."
    },
    {
      author: "Rachel M.",
      rating: 5,
      text: "Took my whole family for my mom's birthday. The Chicken Souvlaki platter and the pasta primavera were incredible. Staff made us feel so welcome and even brought out a surprise dessert!"
    },
    {
      author: "Chris W.",
      rating: 5,
      text: "The Monte Carlo chicken sandwich is something else — bacon, Swiss, grilled chicken, all perfectly layered. And the fries are always hot and crispy. Mario's is our go-to spot."
    },
    {
      author: "Linda P.",
      rating: 5,
      text: "Ordered the grilled salmon platter for the first time and I am officially hooked. Perfectly seasoned, cooked just right, with a gorgeous salad. Hidden gem in Cleveland NC!"
    },
    {
      author: "James T.",
      rating: 5,
      text: "My son's favorite restaurant in the whole state. He asks for the meatball parmigiana sub every single weekend. The meatballs taste totally homemade and the marinara is rich and thick."
    },
    {
      author: "Angela B.",
      rating: 5,
      text: "As a regular for 3 years, I can honestly say Mario's has never had an off day. The Hawaiian Grilled Chicken with pineapple is something you have to try at least once in your life."
    },
    {
      author: "Kevin H.",
      rating: 5,
      text: "Honestly one of the most underrated restaurants in Rowan County. The Chopped Hamburger Steak with brown gravy rivals anything from a steakhouse. Staff are incredibly warm and caring."
    },
    {
      author: "Diane Foster",
      rating: 5,
      text: "The Greek salad is huge and fresh — so much feta, olives, and those stuffed grape leaves put it over the top. We always order two and split. Excellent quality for the price!"
    },
    {
      author: "Robert K.",
      rating: 5,
      text: "Country Fried Steak smothered in gravy, with mashed potatoes on the side — pure Southern comfort on a plate. This is what Cleveland NC dining is all about. Absolutely love this place."
    }
  ]
};

// Export data for script.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = restaurantData;
}
