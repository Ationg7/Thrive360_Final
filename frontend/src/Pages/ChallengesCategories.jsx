// import React from "react";
// import { Container, Row, Card, Button, Nav, Tab } from "react-bootstrap";
// import { useChallenges } from "../Pages/Challenges"; // your context provider

// const allChallenges = [
//   { title: "Morning Mindfulness", description: "5 min breathing exercise", type: "Daily", daysLeft: "2 Days left", participants: 120 },
//   { title: "Digital Detox", description: "2 hours without devices", type: "Daily", daysLeft: "1 Day left", participants: 90 },
//   { title: "Healthy Breakfast", description: "Eat a balanced meal", type: "Daily", daysLeft: "3 Days left", participants: 80 },
//   { title: "Healthy Breakfast", description: "Eat a balanced meal", type: "Daily", daysLeft: "3 Days left", participants: 80 },


//   { title: "Weekly Walk", description: "Walk 5 km in a week", type: "Weekly", daysLeft: "5 Days left", participants: 150 },
//   { title: "Social Media Detox", description: "Limit social apps to 30 min", type: "Weekly", daysLeft: "6 Days left", participants: 130 },
//   { title: "Weekly Journaling", description: "Write daily reflections", type: "Weekly", daysLeft: "7 Days left", participants: 110 },

//   { title: "Monthly Reading Goal", description: "Read 2 books", type: "Monthly", daysLeft: "15 Days left", participants: 200 },
//   { title: "Monthly Fitness", description: "Attend 8 workouts", type: "Monthly", daysLeft: "20 Days left", participants: 180 },
//   { title: "Monthly Charity", description: "Volunteer once", type: "Monthly", daysLeft: "25 Days left", participants: 140 },
// ];

// const getTheme = (type) => {
//   if (type === "Daily") return "blue";
//   if (type === "Weekly") return "purple";
//   return "lightblue"; // Monthly
// };

// const ChallengesCategories = () => {
//   const { joinedChallenges, joinChallenge } = useChallenges();

//   return (
//     <Container fluid className="challenges-container">
//       <div className="header text-center mb-4">
//         <h2>All Challenges</h2>
//         <p className="description">Choose challenges to join and improve your habits!</p>
//       </div>

//       <Tab.Container defaultActiveKey="Daily">
//         <Nav variant="tabs" className="mb-3 justify-content-center">
//           {["Daily", "Weekly", "Monthly"].map((type) => (
//             <Nav.Item key={type}>
//               <Nav.Link eventKey={type}>{type}</Nav.Link>
//             </Nav.Item>
//           ))}
//         </Nav>

//         <Tab.Content>
//           {["Daily", "Weekly", "Monthly"].map((type) => (
//             <Tab.Pane eventKey={type} key={type}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: "flex-start",
//                   alignItems: "flex-start", // align all cards to top
//                   rowGap: "1.5rem", // vertical space between rows
//                   columnGap: "1.5%", // horizontal space between cards
//                 }}
//               >
//                 {allChallenges
//                   .filter((c) => c.type === type)
//                   .map((challenge, index) => {
//                     const isJoined = joinedChallenges.some((c) => c.title === challenge.title);
//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           flex: "0 0 32%", // consistent width (~1/3 of row)
//                           maxWidth: "32%",
//                         }}
//                       >
//                         <Card
//                           className={`challenge ${getTheme(type)}`}
//                           style={{ minHeight: "350px", width: "100%" }}
//                         >
//                           <div className="card-header d-flex justify-content-between">
//                             <span className="type-tag">{challenge.type}</span>
//                             <span className="status-tag">{isJoined ? "Joined ✅" : "Join ❌"}</span>
//                           </div>
//                           <Card.Body>
//                             <Card.Title>{challenge.title}</Card.Title>
//                             <Card.Text>{challenge.description}</Card.Text>

//                             <div className="details mb-2 d-flex justify-content-between">
//                               <span>📅 {challenge.daysLeft}</span>
//                               <span>👥 {challenge.participants} participants</span>
//                             </div>

//                             <Button
//                               className="challenge-button"
//                               onClick={() => joinChallenge({ ...challenge, theme: getTheme(type) })}
//                               disabled={isJoined}
//                             >
//                               {isJoined ? "Joined ✅" : "Join Challenge"}
//                             </Button>
//                           </Card.Body>
//                         </Card>
//                       </div>
//                     );
//                   })}
//               </div>
//             </Tab.Pane>
//           ))}
//         </Tab.Content>
//       </Tab.Container>
//     </Container>
//   );
// };

// export default ChallengesCategories;
import React from "react";
import { Container, Card, Button, Nav, Tab } from "react-bootstrap";
import { useChallenges } from "../Pages/Challenges";

const allChallenges = [
  { title: "Morning Mindfulness", description: "5 min breathing exercise", type: "Daily", daysLeft: "2 Days left", participants: 120 },
  { title: "Digital Detox", description: "2 hours without devices", type: "Daily", daysLeft: "1 Day left", participants: 90 },
  { title: "Healthy Breakfast", description: "Eat a balanced meal", type: "Daily", daysLeft: "3 Days left", participants: 80 },
  { title: "Weekly Walk", description: "Walk 5 km in a week", type: "Weekly", daysLeft: "5 Days left", participants: 150 },
  { title: "Social Media Detox", description: "Limit social apps to 30 min", type: "Weekly", daysLeft: "6 Days left", participants: 130 },
  { title: "Weekly Journaling", description: "Write daily reflections", type: "Weekly", daysLeft: "7 Days left", participants: 110 },
  { title: "Monthly Reading Goal", description: "Read 2 books", type: "Monthly", daysLeft: "15 Days left", participants: 200 },
  { title: "Monthly Fitness", description: "Attend 8 workouts", type: "Monthly", daysLeft: "20 Days left", participants: 180 },
  { title: "Monthly Charity", description: "Volunteer once", type: "Monthly", daysLeft: "25 Days left", participants: 140 },
];

const getTheme = (type) => {
  if (type === "Daily") return "blue";
  if (type === "Weekly") return "purple";
  return "lightblue"; // Monthly
};

const ChallengesCategories = () => {
  const { joinedChallenges, joinChallenge } = useChallenges();

  return (
    <Container fluid className="challenges-container">
      <div className="header text-center mb-4">
        <h2>All Challenges</h2>
        <p className="description">Choose challenges to join and improve your habits!</p>
      </div>

      <Tab.Container defaultActiveKey="Daily">
        <Nav variant="tabs" className="mb-3 justify-content-center">
          {["Daily", "Weekly", "Monthly"].map((type) => (
            <Nav.Item key={type}>
              <Nav.Link eventKey={type}>{type}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          {["Daily", "Weekly", "Monthly"].map((type) => (
            <Tab.Pane eventKey={type} key={type}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}
              >
                {allChallenges
                  .filter((c) => c.type === type)
                  .filter((c) => !joinedChallenges.some((jc) => jc.title === c.title))
                  .map((challenge, index) => (
                    <div key={index} style={{ flex: "0 0 32%", minWidth: "280px" }}>
                      <Card className={`challenge ${getTheme(type)}`} style={{ minHeight: "350px" }}>
                        <div className="card-header d-flex justify-content-between">
                          <span className="type-tag">{challenge.type}</span>
                          <span className="status-tag">Join ❌</span>
                        </div>
                        <Card.Body>
                          <Card.Title>{challenge.title}</Card.Title>
                          <Card.Text>{challenge.description}</Card.Text>
                          <div className="details mb-2 d-flex justify-content-between">
                            <span>📅 {challenge.daysLeft}</span>
                            <span>👥 {challenge.participants} participants</span>
                          </div>
                          <Button
                            className="challenge-button"
                            onClick={() =>
                              joinChallenge({
                                ...challenge,
                                theme: getTheme(type),
                                status: "In Progress",
                                progress: 0,
                              })
                            }
                          >
                            Join Challenge
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ChallengesCategories;
