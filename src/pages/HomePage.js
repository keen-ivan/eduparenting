// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the new stylesheet
import '../components/ChildLevelCard.css'; // Import the card stylesheet

function HomePage() {
  // Static content for the "About Us" section
  const purposeText = "Eduparenting is designed to empower parents with knowledge and resources tailored to their child's unique developmental stage. Our goal is to provide a supportive platform that simplifies complex parenting challenges, offering expert insights, engaging activities, and a sense of community for every step of the journey.";
  const growthStagesIntro = "Children's growth is a beautiful and complex journey, typically divided into distinct stages, each with its own set of developmental milestones and unique parenting needs. Understanding these stages helps you provide the most effective support and guidance.";

  // Static data for the child growth levels
  const childLevels = [
    { id: 'toddlers', title: 'Toddlers', ageRange: '0-3 years', description: 'Focus on early development, language acquisition, and basic independence.' },
    { id: 'early-childhood', title: 'Early Childhood', ageRange: '3-6 years', description: 'Exploring social skills, pre-school learning, and emotional regulation.' },
    { id: 'middle-childhood', title: 'Middle Childhood', ageRange: '7-11 years', description: 'Navigating school life, friendships, and developing a sense of self.' },
    { id: 'adolescence', title: 'Adolescence', ageRange: '12-18 years', description: 'Supporting identity formation, peer relationships, and preparation for adulthood.' },
    { id: 'emerging-adulthood', title: 'Emerging Adulthood', ageRange: '18+ years', description: 'Guidance for independence, career choices, and continuing personal growth.' },
  ];

  return (
    <div className="home-page-container">
      {/* About Us Section */}
      <section className="about-section">
        <h2>About Eduparenting</h2>
        <p>{purposeText}</p>
      </section>

      {/* Child Growth Stages Introduction */}
      <section className="intro-section">
        <h3>Understanding Child Growth Stages</h3>
        <p>{growthStagesIntro}</p>
      </section>

      {/* Child Level Cards Section */}
      <section className="cards-section">
        <h3>Choose Your Child's Stage:</h3>
        <div className="card-grid-container">
          {childLevels.map((level) => (
            <Link
              key={level.id}
              to={`/dashboard/${level.id}`}
              className="child-level-card-link"
            >
              <div className="child-level-card">
                <h4>{level.title}</h4>
                <p className="age-range">{level.ageRange}</p>
                <p className="description">{level.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;