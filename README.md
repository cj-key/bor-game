# Bill of Rights Game
## Table of Contents
1. [About](#about)
2. [Video Tutorial](#video-tutorial)
3. [Tech Stack](#tech-stack)
4. [Setup](#setup)
5. [Code Examples](#code-examples)
6. [Features](#features)
7. [License](#license)
8. [Contact](#contact)
## About
The Bill of Rights Game is an interactive learning experience for understanding the first ten amendments of the United States Constitution. Users match description tiles to corresponding amendment cards, then receive instant feedback on their accuracy and comprehension. The game aims to provide an engaging method for learning about foundational rights in the US.
## Video Tutorial
The following video explains the application in detail:
Coming Soon!
## Tech Stack
JavaScript Bricks is built using the following technologies:
- JavaScript: The game logic and interactions.
- HTML: The structure of the web page.
- CSS: The styling and layout of the web page.
## Setup
Follow the steps below to set up and run the game:
1. Clone the repository or download the source code.
2. Ensure you have a web browser installed. The game has been tested and works well on Google Chrome, Mozilla Firefox, and Safari.
3. Open the `index.html` file in your browser to start the game.
## Code Examples
The game primarily uses JavaScript for its logic, HTML for structure, and CSS for styling. 
**JavaScript Example:** 
Shuffling an Array (Fisher-Yates Shuffle Algorithm)
This is a common algorithm to shuffle an array randomly. It can be used, for example, to shuffle the description tiles.
```javascript
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const sampleArray = [1, 2, 3, 4, 5];
console.log(shuffleArray(sampleArray));
```
## Features
- **Interactive Gameplay:** Users can drag and drop description tiles onto amendment cards, promoting active engagement with the content.
- **Instant Feedback:** Upon checking answers, users receive instant feedback, which helps solidify understanding of the amendments.
- **Scoring System:** The game calculates a score based on the number of correctly matched tiles, providing a way to track progress and improvement.
- **Timer:** A timer feature tracks the duration of gameplay, promoting efficiency and time management skills.
- **Restart Capability:** Users can easily restart the game to improve their score or reinforce their knowledge.
## License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
## Contact
[C.J. Key ](https://www.linkedin.com/in/cj-key-8a386915a/)
---
Enjoy the game and feel free to reach out if you have any questions or suggestions!
